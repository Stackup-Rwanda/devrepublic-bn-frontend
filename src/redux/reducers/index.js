import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './userReducer';
import langReducer from './i18n';
import signupReducer from './signupReducer';
import forgotPasswordReducer from './forgotPassword';
import resetPasswordReducer from './resetPassword';
import getRequestsReducer from './ getRequestsReducer';
import viewUsersReducer from './getUsersReducer';
import setRolesReducer from './setRolesReducer';
import statsReducer from './stats';
import facilityReducer from './facilityReducer';
import createRequestsReducer from './createRequests';

export default combineReducers({
  user: authReducer,
  signupReducer,
  language: langReducer,
  profile: profileReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  requests: getRequestsReducer,
  viewUsers: viewUsersReducer,
  setRolesReducer,
  stats: statsReducer,
  facilities: facilityReducer,
  newRequest: createRequestsReducer,
});
