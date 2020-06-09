/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE } from '../redux/actions/actionsTypes';
import { createOnewayAction, createReturnTripAction, createMultiCityTripAction } from '../redux/actions/createRequests';
import createRequestsReducer from '../redux/reducers/createRequests';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('New Requests Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should create oneway request', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        location: 'kigali',
        destination: 'nairobi',
      },
    }));
    await store.dispatch(createOnewayAction({
      location: 'kigali',
      destination: 'nairobi',
    }));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(CREATE_REQUEST_SUCCESS);
  });
  it('should create return requests', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        location: 'kigali',
        destination: 'nairobi',
      },
    }));
    await store.dispatch(createReturnTripAction({
      location: 'kigali',
      destination: 'nairobi',
    }));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(CREATE_REQUEST_SUCCESS);
  });
  it('should create multicity requests', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        location: 'kigali',
        destination: 'nairobi',
      },
    }));
    await store.dispatch(createMultiCityTripAction({
      location: 'kigali',
      destination: 'nairobi',
    }));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(CREATE_REQUEST_SUCCESS);
  });
  it('should not create a new request', async () => {
    await mockAxios.post.mockImplementationOnce(() => Promise.reject({ response: { data: 'server error' } }));
    await store.dispatch(createOnewayAction({
      location: 'kigali',
      destination: 'nairobi',
    }));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(CREATE_REQUEST_FAILURE);
  });
});

describe('Request Tables reducer', () => {
  const initialState = {
    request: {},
    error: '',
  };
  it('should create requests successfull', () => {
    createRequestsReducer(initialState, {
      type: CREATE_REQUEST_SUCCESS,
      payload: {
        request: {},
        error: '',
      },
    });
  });
  it('should return an error with no request created', () => {
    createRequestsReducer(initialState, {
      type: CREATE_REQUEST_FAILURE,
      payload: {
        request: {},
        error: 'Request already exist',
      },
    });
  });
});
