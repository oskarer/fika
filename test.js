var services = require('./services');

services.getNextWeek()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  })
