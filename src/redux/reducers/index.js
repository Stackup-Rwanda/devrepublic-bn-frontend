import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './userReducer';
import langReducer from './i18n';
import signupReducer from './signupReducer';
import getRequestsReducer from './ getRequestsReducer';

export default combineReducers({
  user: authReducer,
  signupReducer,
  language: langReducer,
  profile: profileReducer,
  requests: getRequestsReducer,
});
