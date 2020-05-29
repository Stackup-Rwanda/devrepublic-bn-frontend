import { CREATE_REQUEST_FAILURE, CREATE_REQUEST_SUCCESS } from '../actions/actionsTypes';
import createRequestsReducer from './CreateReducer';

const initialState = {
  request: [],
  error: '',
};

export default createRequestsReducer(initialState, {
  [CREATE_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    request: payload,
  }),
  [CREATE_REQUEST_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload.error,
  }),
});
