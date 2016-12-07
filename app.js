var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();
var services = require('./services');
module.exports = api;

api.post('/fika', function () {
  return services.constructSlackMessage()
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      return error.message;
    })
});
