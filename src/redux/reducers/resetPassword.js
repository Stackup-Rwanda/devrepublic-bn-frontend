import { RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from '../actions/actionsTypes';
import resetPasswordReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
};

export default resetPasswordReducer(initialState, {
  [RESET_PASSWORD_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [RESET_PASSWORD_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
