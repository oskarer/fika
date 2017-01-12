require('babel-polyfill');
var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();
var services = require('./lib/services');

api.post('/fika', function () {
  return services.getThisWeek()
    .then(function (result) {
      return services.formatSlackMessage(result.fika, result.dependencies);
    }).catch(function (error) {
      return error.message;
    });
});

api.post('/slack', function () {
  return services.getThisWeek()
    .then(function (result) {
      return services.formatSlackMessage(result.fika, result.dependencies);
    }).catch(function (error) {
      return error.message;
    });
});

api.get('/all', function () {
  return services.getAllWeeks()
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      return error.message;
    })
})


module.exports = api;
