import rp from 'request-promise';
import moment from 'moment';
import { zipObject } from 'lodash';

export async function getThisWeek() {
  const schedule = await getScheduleFromGoogleSheets();
  const friday = moment().locale('sv').weekday(4);
  const year = moment().format('YYYY');
  const week = moment().format('WW');
  return schedule[`${year}-${week}`];
}

export async function getAllWeeks() {
  const schedule = await getScheduleFromGoogleSheets();
  return schedule;
}

async function getScheduleFromGoogleSheets() {
  const { SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } = process.env;
  const response = await rp('https://sheets.googleapis.com/v4/spreadsheets/' +
    `${SPREADSHEET_ID}/values:batchGet?ranges=${SHEET_NAME}!A2:C` +
    '&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING' +
    `&majorDimension=ROWS&key=${GOOGLE_API_KEY}`);
  const result = JSON.parse(response);

  const weeks = result.valueRanges[0].values.map((entry) => entry[0]);
  const persons = result.valueRanges[0].values.map((entry) => ({
    fika: entry[1],
    dependencies: entry[2],
  }));
  return zipObject(weeks, persons);
}

export function formatSlackMessage(fika, dependency) {
  const { SPREADSHEET_ID } = process.env;
  const weekNumber = moment().week();
  const friday = moment().locale('sv').weekday(4);
  return {
  	"response_type": "in_channel",
    "text": `Schedule week ${friday.week()}, ${friday.format('YYYY-MM-DD')}. ` +
      `Edit schedule <https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`+
      '/edit|here>',
  	"attachments": [
      {
        "text": "*Fika:* " + fika + "\n*Dependency check:* " + dependency,
        "mrkdwn_in": ["text"]
      }
    ]
  }
}
