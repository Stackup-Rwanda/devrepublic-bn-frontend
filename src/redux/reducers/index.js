import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './userReducer';
import langReducer from './i18n';
import signupReducer from './signupReducer';

export default combineReducers({
  user: authReducer,
  signupReducer,
  language: langReducer,
  profile: profileReducer,
});
