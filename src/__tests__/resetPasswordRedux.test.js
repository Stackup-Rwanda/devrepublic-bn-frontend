/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from '../redux/actions/actionsTypes';
import { resetPasswordAction } from '../redux/actions/resetPassword';
import resetPasswordReducer from '../redux/reducers/resetPassword';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('reset password Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully reset a password', async () => {
    mockAxios.put.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'reset password sucessfully',
      },
    }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(resetPasswordAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RESET_PASSWORD_SUCCESS);
  });
  it('should not reset password', async () => {
    await mockAxios.put.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(resetPasswordAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RESET_PASSWORD_ERROR);
  });
});

describe('password reset reducer', () => {
  const initialState = { data: null, error: null };
  it('should test successfull password reset', () => {
    const response = resetPasswordReducer(initialState, {
      type: RESET_PASSWORD_SUCCESS,
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
  it('should test unsuccessfull password reset', () => {
    const response = resetPasswordReducer(initialState, {
      type: RESET_PASSWORD_ERROR,
      payload: {
        error: null,
      },
    });
    expect(response).toEqual({
      data: null, error: { error: null },
    });
  });
});
