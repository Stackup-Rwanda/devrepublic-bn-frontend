import { SET_ROLE_SUCCESS, SET_ROLE_ERROR } from '../actions/actionsTypes';
import setRolesReducer from './CreateReducer';

const initialState = {
  user: null,
  error: null,
};

export default setRolesReducer(initialState, {
  [SET_ROLE_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  [SET_ROLE_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
