import { combineReducers } from 'redux';
import testReducer from './test-redux';

export default combineReducers({
  test: testReducer,
});
