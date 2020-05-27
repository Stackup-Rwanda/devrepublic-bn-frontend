import { GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILURE } from '../actions/actionsTypes';
import getRequestsReducer from './CreateReducer';

const initialState = {
  requests: [],
  bookings: [],
  error: '',
  loading: false,
};

export default getRequestsReducer(initialState, {
  [GET_REQUESTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    requests: payload.requests,
    bookings: payload.bookings,
  }),
  [GET_REQUESTS_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
