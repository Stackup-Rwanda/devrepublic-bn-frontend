import { LOGIN_ERROR, LOGIN_SUCCESS } from '../actions/actionsTypes';
import authReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
};

export default authReducer(initialState, {
  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [LOGIN_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
