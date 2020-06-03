import { GET_USERS_SUCCESS, GET_USERS_ERROR } from '../actions/actionsTypes';
import getUsersReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
};

export default getUsersReducer(initialState, {
  [GET_USERS_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [GET_USERS_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
