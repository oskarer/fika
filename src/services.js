import rp from 'request-promise';
import moment from 'moment';

export async function getThisWeek() {
  const schedule = await getScheduleFromGithub();
  const friday = moment().locale('sv').weekday(4);
  const nextWeek = schedule[`2016-${friday.week()}`];
  return formatSingleWeekMessage(nextWeek.fika, nextWeek.dependencies, friday);
}

async function getScheduleFromGithub() {
  const result = await rp('https://raw.githubusercontent.com/' +
    'oskarer/fika/master/schedule.json')
  return JSON.parse(result);
}

function formatSingleWeekMessage(fika, dependency, friday) {
  const weekNumber = moment().week();
  const date = moment()
  return {
  	"response_type": "in_channel",
    "text": `Schedule week ${friday.week()}, ${friday.format('YYYY-MM-DD')}.`,
  	"attachments": [
      {
        "text": "*Fika:* " + fika + "\n*Dependency check:* " + dependency,
        "mrkdwn_in": ["text"]
      }
    ]
  }
}
