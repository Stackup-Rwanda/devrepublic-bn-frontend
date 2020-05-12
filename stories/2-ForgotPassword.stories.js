import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import store from '../src/store';
import ForgotPassword from '../src/components/authentication/forgotPassword';

export default {
  component: ForgotPassword,
  title: 'Forgot Password',
  excludeStories: /.*Data$/,
};

export const forgotData = {
  email: 'jim@gmail.com',
};

export const actionsData = {
  FORGOT_PASSWORD_SUCCESS: action('FORGOT_PASSWORD_SUCCESS'),
  FORGOT_PASSWORD_ERROR: action('FORGOT_PASSWORD_ERROR'),
};

export const Default = () => (
  <Provider store={store}>
    <ForgotPassword task={{ ...forgotData }} {...actionsData} />
  </Provider>
);

export const ForgotPasswordSuccess = () => (
  <ForgotPassword task={{ ...forgotData, state: 'FORGOT_PASSWORD_SUCCESS' }} {...actionsData} />
);

export const ForgotPasswordError = () => <ForgotPassword task={{ ...forgotData, state: 'FORGOT_PASSWORD_ERROR' }} {...actionsData} />;