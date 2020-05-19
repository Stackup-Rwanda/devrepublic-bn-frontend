/* eslint-disable prefer-promise-reject-errors */
import * as React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILURE } from '../redux/actions/actionsTypes';
import { getRequestsAction } from '../redux/actions/getRequests';
import getRequestsReducer from '../redux/reducers/ getRequestsReducer';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('Requests Tables Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should return requests', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'ALl requests',
        requests: [{ id: 'awedfr8678', managerId: 'wserct543', returnDate: '2017-06-15' }],
        bookings: [{ facilityId: 'dfghj', facilityName: 'Marriot' }],
      },
    }));
    const token = process.env.TOKEN;

    await store.dispatch(getRequestsAction(token));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_REQUESTS_SUCCESS);
  });
  it('should not return requests', async () => {
    await mockAxios.get.mockImplementationOnce(() => Promise.reject({ error: 'server error' }));
    const token = process.env.TOKEN;

    await store.dispatch(getRequestsAction(token));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_REQUESTS_FAILURE);
  });
});

describe('Request Tables reducer', () => {
  const initialState = {
    requests: [],
    bookings: [],
    error: null,
  };
  it('should return requests successfull', () => {
    const response = getRequestsReducer(initialState, {
      type: GET_REQUESTS_SUCCESS,
      payload: {
        bookings: [],
        requests: [],
        error: null,
      },
    });
    expect(response).toEqual({
      requests: [],
      bookings: [],
      error: null,
    });
  });
  it('should return an error with no request', () => {
    const response = getRequestsReducer(initialState, {
      type: GET_REQUESTS_FAILURE,
      payload: {
        error: 'Server error',
      },
    });
    expect(response).toEqual({
      requests: [],
      bookings: [],
      error: { error: 'Server error' },
    });
  });
});
