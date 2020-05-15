/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { render } from '../components/authentication/loginDefaultProps';

describe('Login functionalities', () => {
  it('test handlePassword and handleEmail function with valid credential', async () => {
    const wrapper = render();
    wrapper.setState({
      email: 'ai@awse.cdfv',
      password: 'Bien@AY890',
      passwordIsValid: true,
      disableBtn: true,
      emailIsValid: true,
      removeHover: 'removeHover',
    });
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'ai@awse.cdfv' } });
    wrapper.find('.testInput1').first().simulate('change', { target: { value: 'Bien@AY890' } });
    const passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const enteredPassword = wrapper.state().password;
    const enteredEmail = wrapper.state().email;
    const emailValidation = emailRegex.test(enteredEmail);
    const isPasswordValid = passwordRegex.test(enteredPassword);
    expect(isPasswordValid).toBeTruthy();
    expect(emailValidation).toBeTruthy();
  });
  it('test handleEmail with invalid email', async () => {
    const wrapper = render();
    wrapper.setState({
      email: 'ai9#7878',
      password: '123456',
      emailIsValid: false,
    });
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'aai9#7878' } });
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const enteredEmail = wrapper.state().email;
    const emailValidation = emailRegex.test(enteredEmail);
    expect(emailValidation).toBeFalsy();
  });
  it('should return Welcome! Verify your account first', async () => {
    const wrapper = render();
    wrapper.setState({
      email: 'example@jk.io',
      password: 'Bien@BAR789',
    });
    const { loginAction } = wrapper.instance().props;
    loginAction.mockReturnValueOnce({ payload: { isVerified: false } });
    wrapper.setState({
      visible: true,
      errorMessage: 'Welcome! Verify your account first.',
      textColor: 'dark',
    });
    const form = wrapper.find('.login').first();
    const event = { preventDefault: jest.fn() };
    form.simulate('submit', event);
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'example@jk.io' } });
    wrapper.find('.testInput1').first().simulate('change', { target: { value: 'aime@as.dc' } });
  });
});
describe('ERROR RESPONSE CAN NOT LOGIN', () => {
  it('payload.status === 401', async () => {
    const wrapper = render();
    wrapper.setState({
      email: 'example@jk.io',
      password: 'Bien@BAR789',
      textColor: '',
      visible: false,
      errorMessage: '',
    });
    const { loginAction } = wrapper.instance().props;
    loginAction.mockReturnValueOnce({ payload: { status: 401 } });
    wrapper.setState({
      visible: true,
      errorMessage: 'Welcome! Verify your account first.',
      textColor: 'dark',
    });
    const form = wrapper.find('.login').first();
    const event = { preventDefault: jest.fn() };
    form.simulate('submit', event);
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'aime@as.dc' } });
    wrapper.find('.testInput1').first().simulate('change', { target: { value: 'aime@as.dc' } });
  });
});
