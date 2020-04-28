/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
import * as React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR } from '../redux/actions/actionTypes';
import { forgotPasswordAction } from '../redux/actions/forgotPassword';
import forgotPasswordReducer from '../redux/reducers/forgotPassword';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('forgot password Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully forgot a password', async () => {
    await mockAxios.put.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'forgot password sucessfully',
      },
    }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(forgotPasswordAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(FORGOT_PASSWORD_SUCCESS);
  });
  it('should not forgot password', async () => {
    await mockAxios.put.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(forgotPasswordAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(FORGOT_PASSWORD_ERROR);
  });
});

describe('password forgot reducer', () => {
  const initialState = { data: null, error: null };
  it('should test successfull password forgot', () => {
    const response = forgotPasswordReducer(initialState, {
      type: FORGOT_PASSWORD_SUCCESS,
      payload: {
        user: {}, error: null,
      },
    });
    expect(response).toEqual({
        "data": null,
        "error": null,
        "isPasswordForgotten": true,
        "userEmail": {
          "error": null,
          "user": {},
        }   
        });
  });
  it('should test unsuccessfull password forgot', () => {
    const response = forgotPasswordReducer(initialState, {
      type: FORGOT_PASSWORD_ERROR,
      payload: {
        error: null,
      },
    });
    expect(response).toEqual({
      data: null, error: { error: null },
    });
  });
});