/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import dotenv from 'dotenv';
import mockAxios from 'axios';
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from '../redux/actions/actionsTypes';
import { signupAction } from '../redux/actions/signupAction';
import signupReducer from '../redux/reducers/signupReducer';

dotenv.config();
let store;
const mockedStore = configureStore([thunk]);

describe('Signup Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should successfully signup user', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 200,
        message: 'sign up is sucessful',
        data: process.env.TOKEN,
        isVerified: true,
      },
    }));
    const signupUser = {
      firstName: 'James',
      lastName: 'Ntare',
      email: 'james@barefoot.com',
      password: 'Bien#Bar78',
    };

    await store.dispatch(signupAction(signupUser));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SIGNUP_SUCCESS);
  });
  it('should not singup user', async () => {
    await mockAxios.post.mockImplementationOnce(() => Promise.reject({ response: { data: 401 } }));
    const signupUser = {
      firstName: 'jasdf',
      lastName: 'dasfas',
      email: 'fjasldf',
      password: 'alsdf@gas',
    };
    await store.dispatch(signupAction(signupUser));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SIGNUP_ERROR);
  });
});

describe('signup reducer', () => {
  const initialState = { user: null, error: null, isLoggedIn: false };
  it('should test a successful signup', () => {
    const response = signupReducer(initialState, {
      type: SIGNUP_SUCCESS,
      payload: {
        user: {},
        error: null,
        status: 200,
      },
    });
    expect(response).toEqual(
      {
        user: { user: {}, error: null, status: 200 },
        error: null,
        isLoggedIn: true,
      },
    );
  });
  it('should test  unsuccessful signup', () => {
    const response = signupReducer(initialState, {
      type: SIGNUP_ERROR,
      payload: {
        error: 'invalid user credentials',
        status: 401,
      },
    });
    expect(response).toEqual({
      user: null,
      error: { error: 'invalid user credentials', status: 401 },
      isLoggedIn: false,
    });
  });
});
