/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import reduxStore from '../store';
import ForgotPassword from '../components/authentication/forgotPassword';

const forgotPasswordComponent = (props = {
  history: {},
  user: {},
  push: jest.fn(),
  forgotPasswordAction: jest.fn(),
}) => {
  const component = mount(
    <Provider store={reduxStore}>
      <ForgotPassword {...props} />
    </Provider>,
  );
  return component;
};

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('forgotPassword component tests', () => {
  let component;
  beforeEach(() => {
    component = forgotPasswordComponent();
  });
  it('should render forgotPassword component', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render forgotPassword title', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should submit a form with all info', async () => {
    const wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
    act(() => {
      const form = wrapper.find('form');
      const event = { preventDefault: jest.fn() };
      form.simulate('submit', event);
      wrapper.find('input').simulate('change', { target: { value: 'aime@as.dc' } });
    });
  });
});
