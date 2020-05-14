/* eslint-disable prefer-promise-reject-errors */
import * as React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR } from '../redux/actions/actionsTypes';
import { loginAction } from '../redux/actions/login';
import authReducer from '../redux/reducers/auth';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('Login Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully login user', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'logged in sucessfully',
        data: process.env.TOKEN,
        isVerified: true,
      },
    }));
    const loginUser = {
      email: 'barefoot@barefoot.com',
      password: 'Bien#Bar78',
    };

    await store.dispatch(loginAction(loginUser));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LOGIN_SUCCESS);
  });
  it('should not login user', async () => {
    await mockAxios.post.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const loginUser = {
      email: '',
      password: '',
    };
    await store.dispatch(loginAction(loginUser));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LOGIN_ERROR);
  });
});

describe('login reducer', () => {
  const initialState = { data: null, error: null };
  it('should test successfull login', () => {
    const response = authReducer(initialState, {
      type: LOGIN_SUCCESS,
      payload: {
        user: {}, error: null,
      },
    });
    expect(response).toEqual({
      data: null, user: { error: null, user: {} }, error: null,
    });
  });
  it('should test  unsuccessfull login', () => {
    const response = authReducer(initialState, {
      type: LOGIN_ERROR,
      payload: {
        error: 'invalid email and password',
        status: 401,
      },
    });
    expect(response).toEqual({
      data: null, error: { error: 'invalid email and password', status: 401 },
    });
  });
});
