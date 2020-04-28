import { combineReducers } from 'redux';
import authReducer from './auth';

export default combineReducers({
  user: authReducer,
});

// user: authReducer,
// import authReducer from './authReducer';
