import { combineReducers } from 'redux';
import authReducer from './auth';
import langReducer from './i18n';

export default combineReducers({
  user: authReducer,
  language: langReducer,
});
