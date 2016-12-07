import rp from 'request-promise';

export async function getNextWeek() {
  const schedule = await getScheduleFromGithub();
  const nextWeek = schedule["2016-49"];
  return formatSingleWeekMessage(nextWeek.fika, nextWeek.dependencies);
}

async function getScheduleFromGithub() {
  const result = await rp('https://raw.githubusercontent.com/' +
    'oskarer/fika/master/schedule.json')
  return JSON.parse(result);
}

function formatSingleWeekMessage(fika, dependency) {
  return {
  	"response_type": "in_channel",
    "text": "Schedule week 49, 2016-12-09.",
  	"attachments": [
      {
        "text": "*Fika:* " + fika + "\n*Dependency check:* " + dependency,
        "mrkdwn_in": ["text"]
      }
    ]
  }
}
