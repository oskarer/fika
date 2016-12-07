var rp = require('request-promise');

function getNextWeek() {
  return getScheduleFromGithub()
    .then(function (result) {
      var nextWeek = result["2016-49"];
      return formatSingleWeekMessage(nextWeek.fika, nextWeek.dependencies);
    })
    .catch(function (error) {
      return error.message;
    })
}

function getScheduleFromGithub() {
  return rp('https://raw.githubusercontent.com/oskarer/fika/master/schedule.json')
    .then(function (result) {
      var schedule = JSON.parse(result);
      return schedule;
    })
    .catch(function (error) {
      return error.message;
    });
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

module.exports = {
  getNextWeek: getNextWeek,
}
