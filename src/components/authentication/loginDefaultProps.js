import * as React from 'react';
import { shallow } from 'enzyme';
import { Login as LoginPage } from './Login';

export const defaultProps = {
  history: {},
  user: {},
  push: jest.fn(),
  loginAction: jest.fn(),
  intl: { formatMessage: jest.fn() },
};
export const render = (params, fn = shallow) => {
  const props = { ...defaultProps, ...params };
  return fn(
    <LoginPage {...props} />,
  );
};
