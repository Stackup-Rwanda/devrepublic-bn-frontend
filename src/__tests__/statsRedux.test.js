/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { GET_STATS, GET_STATS_ERROR } from '../redux/actions/actionsTypes';
import { getStatsAction } from '../redux/actions/stats';
import statsReducer from '../redux/reducers/stats';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('Stats Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should send stats to the user', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    await store.dispatch(getStatsAction(token));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_STATS);
  });
  it('should not singup user', async () => {
    await mockAxios.get.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    await store.dispatch(getStatsAction('dsafdadf'));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_STATS_ERROR);
  });
});

describe('signup reducer', () => {
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

  it('should test when the stats were gotten', () => {
    const response = statsReducer(initialState, {
      type: GET_STATS,
      payload: {
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
        status: 200,
      },
    });
    expect(response).toEqual({
      stats: {
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
        status: 200,
      },
      error: null,
    });
  });
  it('should test  whether the stats were not gotten', () => {
    const response = statsReducer(initialState, {
      type: GET_STATS_ERROR,
      payload: {
        status: 401,
      },
    });
    expect(response).toEqual({
      stats: {
        totalTripsNumber: 0,
        upCommingTrips: 0,
        pastYears: 0,
        statusStatistics: { openRequests: 0, approvedRequests: 0, rejectedRequets: 0 },
      },
      error: { status: 401 },
    });
  });
});
