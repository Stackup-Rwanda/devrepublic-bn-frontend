import { SIGNUP_ERROR, SIGNUP_SUCCESS } from '../actions/actionsTypes';
import signupReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
};

export default signupReducer(initialState, {
  [SIGNUP_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  }),
  [SIGNUP_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
