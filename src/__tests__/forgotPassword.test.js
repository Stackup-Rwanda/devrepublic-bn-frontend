import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import reduxStore from '../store';
import translation from '../components/languages/en.json';
import ForgotPassword from '../components/authentication/forgotPassword';

const mockStore = configureStore([]);

const store2 = mockStore({ email: 'mail@mail.com', language: { language: 'en' } });
store2.dispatch = jest.fn().mockReturnValue({ payload: { status: 200 } });
store2.forgotPasswordAction = jest.fn().mockReturnValueOnce({ payload: { status: 200 } });

const props = {
  history: {},
  user: {},
  push: jest.fn(),
  intl: {},
  forgotPasswordAction: jest.fn().mockReturnValueOnce({ payload: { status: 200 } }),
};

const component = mount(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <Provider store={reduxStore}>
      <ForgotPassword {...props} />
    </Provider>
  </IntlProvider>,
);

describe('forgotPassword component tests', () => {
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
      wrapper.find('input').simulate('change', { target: { value: 'aime@ask.com' } });
    });
  });
});
