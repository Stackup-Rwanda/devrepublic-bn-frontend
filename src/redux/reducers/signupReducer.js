import { SIGNUP_ERROR, SIGNUP_SUCCESS } from '../actions/actionsTypes';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
};

const signupReducer = (initialState, {
  [SIGNUP_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [SIGNUP_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});

export default signupReducer;
