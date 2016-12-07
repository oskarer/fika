var services = require('./services');

services.constructSlackMessage()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  })
