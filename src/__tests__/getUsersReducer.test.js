/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { GET_USERS_SUCCESS, GET_USERS_ERROR } from '../redux/actions/actionsTypes';
import { getUsersAction } from '../redux/actions/viewUsers';
import getUsersReducer from '../redux/reducers/getUsersReducer';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('forgot password Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully forgot a password', async () => {
    await mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'forgot password sucessfully',
      },
    }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(getUsersAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_USERS_SUCCESS);
  });
  it('should not forgot password', async () => {
    await mockAxios.get.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(getUsersAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_USERS_ERROR);
  });
});

describe('password forgot reducer', () => {
  const initialState = { data: null, error: null };
  it('should test successfull password forgot', () => {
    const response = getUsersReducer(initialState, {
      type: GET_USERS_SUCCESS,
      payload: {
        user: {}, error: null,
      },
    });
    expect(response).toEqual({
      data: null,
      error: null,
      user: {
        error: null,
        user: {},
      },
    });
  });
  it('should test unsuccessfull password forgot', () => {
    const response = getUsersReducer(initialState, {
      type: GET_USERS_ERROR,
      payload: {
        error: null,
      },
    });
    expect(response).toEqual({
      data: null, error: { error: null },
    });
  });
});
