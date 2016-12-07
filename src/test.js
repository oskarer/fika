import 'babel-polyfill';
import { getNextWeek } from './services';

(async () => {
  try {
    const result = await getNextWeek();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})();
