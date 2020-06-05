import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import reduxStore from '../store';
import Login from '../components/authentication/Login';
import { defaultProps, render as shallowRender } from '../components/authentication/loginDefaultProps';

describe('Login snapshot', () => {
  const render = (fn = mount) => fn(
    <Provider store={reduxStore}>
      <Login {...defaultProps} />
    </Provider>,
  );
  it('should create a snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
});


describe('Login functionalities', () => {
  it('should submit a form with all info', async () => {
    const wrapper = shallowRender();
    wrapper.setState({
      email: 'email@wd.defs',
      password: '1278',
      loading: false,
      validateForm: false,
      textColor: '',
      visible: false,
      errorMessage: '',
      invalidEmailFeedback: '',
      invalidPasswordFeedback: '',
      emailIsValid: false,
      removeHover: '',
    });
    const { loginAction } = wrapper.instance().props;
    loginAction.mockReturnValueOnce({ payload: { status: 200, isVerified: true } });
    const form = wrapper.find('.login').first();
    const event = { preventDefault: jest.fn() };
    form.simulate('submit', event);
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'aime@as.dc' } });
    wrapper.find('.testInput1').first().simulate('change', { target: { value: 'aime@as.dc' } });
    wrapper.setProps({ history: { push: jest.fn() } });
  });
  it('renser email and password error messages when credential are not valid', () => {
    const wrapper = shallowRender();
    wrapper.find('.testInput').first().simulate('change', { target: { value: 'aime@as.dc' } });

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    wrapper.setState({
      email: 'emailf@wse.wsws,//ws@ws.sx',
      password: '1234',
      invalidEmailFeedback: '',
      invalidPasswordFeedback: '',
      emailIsValid: false,
      passwordIsValid: false,
      disableBtn: true,
      removeHover: 'removeHover',
    });
    const enteredEmail = wrapper.state().email;
    const isEmailValid = emailRegex.test(enteredEmail);
    expect(isEmailValid).toBeFalsy();
    wrapper.setState({
      invalidEmailFeedback: 'Email must be valid',
      disableBtn: true,
    });
    expect(wrapper.state().invalidEmailFeedback).toEqual('Email must be valid');
    wrapper.setState({
      email: 'eaime@sdf.sdc',
      invalidEmailFeedback: '',
    });
    expect(wrapper.state().invalidEmailFeedback).toEqual('');
    const passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/;
    const enteredPassword = wrapper.state().password;
    const isPasswordValid = passwordRegex.test(enteredPassword);
    expect(isPasswordValid).toBeFalsy();
    wrapper.setState({
      invalidPasswordFeedback: 'Minimum 8 character with a special charater, uppcase letter and number',
    });
    expect(wrapper.state().invalidPasswordFeedback).toEqual('Minimum 8 character with a special charater, uppcase letter and number');
    wrapper.setState({
      invalidPasswordFeedback: '',
      emailIsValid: true,
      passwordIsValid: true,
      disableBtn: false,
      email: 'eaime@sdf.sdc',
      invalidEmailFeedback: '',
      password: 'Bien@BAR789',
    });
  });
});
