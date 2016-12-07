var rp = require('request-promise');

function constructSlackMessage() {
  return rp('https://raw.githubusercontent.com/oskarer/fika/master/schedule.json')
    .then(function (result) {
      var schedule = JSON.parse(result);
      return 'Fika: ' + schedule['20161209'].fika + ', dependencies: '
        + schedule['20161209'].deps;
    })
    .catch(function (error) {
      return error.message;
    });
}

module.exports = {
  constructSlackMessage: constructSlackMessage,
}
