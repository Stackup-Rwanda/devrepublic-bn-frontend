import { GET_STATS, GET_STATS_ERROR } from '../actions/actionsTypes';
import statsReducer from './CreateReducer';

const initialState = {
  stats: {
    totalTripsNumber: 0,
    upCommingTrips: 0,
    pastYears: 0,
    statusStatistics: {
      openRequests: 0,
      approvedRequests: 0,
      rejectedRequets: 0,
    },
  },
  error: null,
};

export default statsReducer(initialState, {
  [GET_STATS]: (state, { payload }) => ({
    ...state,
    stats: payload,
  }),
  [GET_STATS_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});
