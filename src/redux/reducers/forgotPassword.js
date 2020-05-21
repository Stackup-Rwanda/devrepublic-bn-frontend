import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_SUCCESS } from '../actions/actionsTypes';
import forgotPasswordReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
};

export default forgotPasswordReducer(initialState, {
  [FORGOT_PASSWORD_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [FORGOT_PASSWORD_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
