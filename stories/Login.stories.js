/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import store from '../src/store';
import LoginPage from '../src/components/authentication/Login';

export default {
  component: LoginPage,
  title: 'Login',
  excludeStories: /.*Data$/,
};

export const LoginPageData = {
  email: 'jim@gexample.com',
  password: 'Bien@BAR789',
};


export const actionsData = {
  LOGIN_SUCCESS: action('LOGIN_SUCCESS'),
  LOGIN_ERROR: action('LOGIN_ERROR'),
};

export const Default = () => (
  <Provider store={store}>
    <LoginPage task={{ ...LoginPageData }} {...actionsData} />
  </Provider>
);

export const LoginSuccess = () => (
  <LoginPage task={{ ...LoginPageData, state: 'LOGIN_SUCCESS' }} {...actionsData} />
);

export const LoginError = () => <LoginPage task={{ ...LoginPageData, state: 'LOGIN_SUCCESS' }} {...actionsData} />;
