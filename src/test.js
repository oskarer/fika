import 'babel-polyfill';
import * as services from './services';

(async () => {

  async function testSingleSlackMessage() {
    try {
      const { week, year, fika, dependencies } = await services.getThisWeek();
      const message = services.singleSlackMessage(fika, dependencies, year, week);
      console.log(message);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function testGetThisWeek() {
    try {
      const result = await services.getThisWeek();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function testGetSlackUsers() {
    try {
      const result = await services.getSlackUsers();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function testGetSchedule() {
    try {
      const result = await services.getSchedule();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  testSingleSlackMessage();

})();
