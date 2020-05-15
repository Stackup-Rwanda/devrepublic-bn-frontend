import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import translation from '../components/languages/en.json';
import reduxStore from '../store';
import ConnectedSignup, { Signup } from '../components/authentication/Signup';
import FormItem from '../components/authentication/FormItem';

const mockStore = configureStore([]);

const store2 = mockStore({ email: 'fe@mg.com', language: { language: 'en' } });
store2.dispatch = jest.fn().mockReturnValue({ payload: { status: 409 } });
store2.signupAction = jest.fn().mockReturnValueOnce({ payload: { status: 409 } });

const defaultProps = {
  history: {},
  user: {},
  push: jest.fn(),
  signupAction: jest.fn().mockReturnValueOnce({ payload: { status: 201 } }),
};

const defaultProps3 = {
  history: {},
  user: {},
  push: jest.fn(),
  signupAction: jest.fn().mockReturnValueOnce({ payload: { status: 409 } }),
};

const signupComponent = shallow(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <Provider store={reduxStore}>
      <ConnectedSignup />
    </Provider>
  </IntlProvider>,
);

const wrapper = mount(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <Provider store={reduxStore}>
      <Signup {...defaultProps} />
    </Provider>
  </IntlProvider>,
);

const wrapper3 = mount(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <Provider store={reduxStore}>
      <Signup {...defaultProps3} />
    </Provider>
  </IntlProvider>,
);

let component;

const formItemComponent = shallow(<FormItem type="text" feedback="some feedback" setValue={() => 'some function'} placeholder="placeholder" defaultValue="value" />);

it('should render Signup component', () => {
  expect(signupComponent.exists()).toBe(true);
});

it('should render form item component', () => {
  expect(formItemComponent.exists()).toBe(true);
});

describe('Signup component tests', () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    component = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Provider store={reduxStore}>
          <Signup handleSubmit={handleSubmit} />
        </Provider>
      </IntlProvider>,
    );
  });

  it('clicks on the signup button', () => {
    component.find('button.signup-form_btn').simulate('click');
    expect(handleSubmit).toBeCalledTimes(0);
  });

  it('renders component', () => {
    expect(component).not.toBeNull();
  });

  it('shows welcome message', () => {
    expect(component.find('.text').text()).toEqual('Welcome to Barefoot Nomad');
  });

  it('should render signup component', () => {
    expect(toJson(signupComponent.dive())).toMatchSnapshot();
  });
});


describe('Signup with props', () => {
  const container = mount(
    <IntlProvider defaultLocale="en" locale="en" messages={translation}>
      <Provider store={reduxStore}>
        <Signup />
      </Provider>
    </IntlProvider>,
  );

  it('should render container as it changes first name', () => {
    container.find('input[placeholder="First Name"]').simulate('change', { target: { value: ' ' } });
    expect(container.find('input[placeholder="First Name"]').prop('defaultValue')).toEqual('');
  });

  it('should render container as password is changing', () => {
    container.find('input[placeholder="Password"]').simulate('change', { target: { value: 'passworD@#13' } });
    expect(container.find('input[placeholder="Password"]').prop('defaultValue')).toEqual('passworD@#13');
  });


  it('should return feedback message', () => {
    expect(container.find('.feedback-message').text()).toEqual('Your password must contain atleast 8 character, including a capital letter and a symbol.');
  });

  it('should render container as password is changing', () => {
    container.find('input[placeholder="Password"]').simulate('change', { target: { value: 'Ntare@101' } });
    expect(container.find('input[placeholder="Password"]').prop('defaultValue')).toEqual('Ntare@101');
  });

  it('should test submit button', () => {
    const form = wrapper.find('.signup-form').first();
    act(() => {
      const event = { preventDefault: jest.fn() };
      form.simulate('submit', event);
    });
  });

  it('should test submit button', () => {
    const form = wrapper3.find('.signup-form').first();
    act(() => {
      const event = { preventDefault: jest.fn() };
      form.simulate('submit', event);
    });
  });
});
