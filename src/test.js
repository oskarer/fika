import 'babel-polyfill';
import { getAllWeeks } from './services';

(async () => {
  try {
    const result = await getAllWeeks();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})();
