import 'babel-polyfill';
import { getThisWeek } from './services';

(async () => {
  try {
    const result = await getThisWeek();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})();
