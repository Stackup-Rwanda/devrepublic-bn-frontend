import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import store from '../src/store';
import Signup from '../src/components/authentication/Signup';

export default {
  component: Signup,
  title: 'Signup',
  excludeStories: /.*Data$/,
};

export const signupData = {
  firstname: 'James',
  lastname: 'Ntare',
  email: 'jim@gmail.com',
  password: 'what1345',
};


export const actionsData = {
  SIGNUP_SUCCESS: action('SIGNUP_SUCCESS'),
  SIGNUP_ERROR: action('SIGNUP_ERROR'),
};

export const Default = () => (
  <Provider store={store}>
    <Signup task={{ ...signupData }} {...actionsData} />
  </Provider>
);

export const SignupSuccess = () => (
  <Signup task={{ ...signupData, state: 'SIGNUP_SUCCESS' }} {...actionsData} />
);

export const SignupError = () => <Signup task={{ ...signupData, state: 'SIGNUP_ERROR' }} {...actionsData} />;
