import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import store from '../src/store';
import ResetPassword from '../src/components/authentication/resetPassword';

export default {
  component: ResetPassword,
  title: 'Reset Password',
  excludeStories: /.*Data$/,
};

export const resetData = {
  email: 'jim@gmail.com',
};

const location = { search: 'https://localhost:3000/password/reset?token=thisismytoken'}
export const actionsData = {
  RESET_PASSWORD_SUCCESS: action('RESET_PASSWORD_SUCCESS'),
  RESET_PASSWORD_ERROR: action('RESET_PASSWORD_ERROR'),
};

export const Default = () => (
  <Provider store={store}>
    <ResetPassword task={{ ...resetData }} {...actionsData} location={location}/>
  </Provider>
);

export const ResetPasswordSuccess = () => (
  <ResetPassword task={{ ...resetData, state: 'RESET_PASSWORD_SUCCESS' }} {...actionsData} />
);

export const ResetPasswordError = () => <ResetPassword task={{ ...resetData, state: 'RESET_PASSWORD_ERROR' }} {...actionsData} />;