import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import reduxStore from '../store';
import translation from '../components/languages/en.json';
import ResetPassword from '../components/authentication/resetPassword';

const props = {
  location: {
    search: 'http://localhost:3000/password/reset?token=thisismyfaketoken',
  },
  history: {},
  user: {},
  intl: {},
  push: jest.fn(),
  resetPasswordAction: jest.fn(),
};

const component = mount(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <Provider store={reduxStore}>
      <ResetPassword {...props} />
    </Provider>
  </IntlProvider>,
);

describe('resetPassword component tests', () => {
  it('should render resetPassword component', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render resetPassword title', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should submit a form with all info', async () => {
    const wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
  });
  it('should submit a form with all info', async () => {
    const wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
    act(() => {
      const form = wrapper.find('form');
      const event = { preventDefault: jest.fn() };
      form.simulate('submit', event);
      wrapper.find('input').simulate('change', { target: { value: 'Pass123?' } });
    });
  });
});
