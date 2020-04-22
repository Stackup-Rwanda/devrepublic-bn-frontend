import { combineReducers } from 'redux';
import authReducer from './auth';
import langReducer from './i18n';
import signupReducer from './signupReducer';

export default combineReducers({
  user: authReducer,
  language: langReducer,
  signupReducer,
});
