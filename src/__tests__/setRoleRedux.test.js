/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { SET_ROLE_SUCCESS, SET_ROLE_ERROR } from '../redux/actions/actionsTypes';
import { setRoleAction } from '../redux/actions/setRole';
import setRoleReducer from '../redux/reducers/setRolesReducer';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('set role  Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully set a role', async () => {
    await mockAxios.patch.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'User roles updated successfully',
      },
    }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(setRoleAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SET_ROLE_SUCCESS);
  });
  it('should not set role', async () => {
    await mockAxios.patch.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const newPassword = 'Bien@Bar78';
    const userToken = 'mytoken';

    await store.dispatch(setRoleAction(newPassword, userToken));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SET_ROLE_ERROR);
  });
});

describe('set role reducer', () => {
  const initialState = { data: null, error: null };
  it('should test successfull set role', () => {
    const response = setRoleReducer(initialState, {
      type: SET_ROLE_SUCCESS,
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
  it('should test unsuccessfull set role', () => {
    const response = setRoleReducer(initialState, {
      type: SET_ROLE_ERROR,
      payload: {
        error: null,
      },
    });
    expect(response).toEqual({
      data: null, error: { error: null },
    });
  });
});
