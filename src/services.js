import rp from 'request-promise';
import moment from 'moment';
import { zipObject } from 'lodash';

export async function getThisWeek() {
  const schedule = await getSchedule();
  const year = moment().year();
  const week = moment().isoWeek();
  return schedule.find((entry) => entry.year === year && entry.week === week);
}

export async function getAllWeeks() {
  return await getSchedule();
}

export async function getScheduleFromGoogleSheets() {
  const { SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } = process.env;
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    `${SPREADSHEET_ID}/values:batchGet?ranges=${SHEET_NAME}!A2:C` +
    '&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING' +
    `&majorDimension=ROWS&key=${GOOGLE_API_KEY}`;
  console.log('Google Spreadsheet URL:', url);
  const response = await rp(url);
  const result = JSON.parse(response);

  console.log(`Got ${result.valueRanges[0].values.length} spreadsheet rows.`);
  return result.valueRanges[0].values.map((entry, week) => ({
    week: parseInt(entry[0].slice(-2)),
    year: parseInt(entry[0].slice(0, 4)),
    fika: entry[1],
    dependencies: entry[2],
  }))
}

export async function getSlackUsers() {
  const { SLACK_TOKEN } = process.env;
  const response = await rp('https://slack.com/api/users.list?token=' +
    `${SLACK_TOKEN}&presence=0`);
  const result = JSON.parse(response);
  const filtered = result.members.map((member) => ({
    name: member.name,
    real_name: member.real_name || member.name,
    image_48: member.profile.image_48,
    image_192: member.profile.image_192,
  }))
  return filtered;
}

export async function getSchedule() {
  const [schedule, users] = await Promise.all([
    getScheduleFromGoogleSheets(),
    getSlackUsers(),
  ])
  const currentYear = moment().year();
  const currentWeek = moment().isoWeek();
  const filtered = schedule.filter(({ year, week }) =>
    year >= currentYear && week >= currentWeek);

  const extended = filtered.map((entry) => {
    const date = moment(
      `${entry.year}W${entry.week < 10 ? '0' + entry.week : entry.week}`);
    const friday = date.locale('sv').weekday(4);
    const fika = users.find((user) => user.name === entry.fika);
    const dependencies = users.find((user) => user.name === entry.dependencies);
    return {
      week: entry.week,
      year: entry.year,
      friday: friday.format('YYYY-MM-DD'),
      fika,
      dependencies
    }
  });

  return extended;
}

export function singleSlackMessage(fika, dependencies, year, week) {
  const { SPREADSHEET_ID } = process.env;
  const date = moment(`${year}W${week < 10 ? '0' + week : week}`);
  const friday = date.locale('sv').weekday(4);
  return {
  	"response_type": "in_channel",
    "text": `Schedule week ${date.week()}, ${friday.format('YYYY-MM-DD')}. ` +
      `Edit schedule <https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`+
      '/edit|here>',
  	"attachments": [
      {
        "text": `*Fika:* ${fika.real_name}`+
          `\n*Dependency check:* ${dependencies.real_name}`,
        "mrkdwn_in": ["text"]
      }
    ]
  }
}
