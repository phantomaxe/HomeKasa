import { combineReducers } from 'redux';
import currentUser from './currentUser';
import showToast from './showToast';
import blank from './blank';
import primaryHouse from './primaryHouse';
import houseName from './houseName';

const rootReducer = combineReducers({
  currentUser,
  showToast,
  blank,
  primaryHouse,
  houseName,
});

export default rootReducer;
