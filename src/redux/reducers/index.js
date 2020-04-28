import { combineReducers } from 'redux';
import testReducer from './test-redux';

export default combineReducers({
  test: testReducer,
});

// user: authReducer,
// import authReducer from './authReducer';
