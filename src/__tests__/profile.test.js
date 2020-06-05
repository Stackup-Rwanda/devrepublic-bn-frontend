import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import configureStore from 'redux-mock-store';
import translation from '../components/languages/en.json';
import ConnectedProfile from '../components/profile/Profile';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'read',
  }]);
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockStore = configureStore([]);
const store = mockStore({
  profile: {
    firstName: 'user',
    lastName: 'firstname',
    email: 'user@example.com',
    language: 'English',
    role: 'Requester',
    currency: 'RWF',
    residence: 'Kari',
    birthdate: '2005-03-05',
    image: 'www.image.example',
    profileFetchError: '',
    fetchImageError: '',
    setEmailNotifError: '',
    emailNotifications: true,
    isVerified: null,
    department: 'IT',
    gender: 'Male',
  },
  user: {
    user: 'gcgchgcghghvhhjb',
  },
  language: {
    language: 'en',
  },
});
const dispatch = jest.fn(() => 3);
store.dispatch = dispatch;
let container; let
  wrapper;


const testChange = (location, name, result, elementContainer) => {
  const input = elementContainer.find(location);
  input.simulate('change', { target: { value: result, name } });
  const { state } = elementContainer.instance();
  expect(state[name]).toBe(result);
};
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'read',
  }]);
  const socket = { emit, on, connect: jest.fn() };
  return jest.fn(() => socket);
});
describe('test trial', () => {
  const user = {
    firstName: 'user',
    lastName: 'firstname',
    email: 'user@example.com',
    language: 'English',
    role: 'Requester',
    currency: 'RWF',
    residence: 'Kari',
    birthdate: '2005-03-05',
    image: 'www.image.example',
    profileFetchError: '',
    fetchImageError: '',
    setEmailNotifError: '',
    emailNotifications: true,
    isVerified: null,
    department: 'IT',
    gender: 'Male',
  };
  beforeEach(() => {
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
    wrapper = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    container = wrapper.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('should have all the input fields', () => {
    const input = container.find('input');
    const select = container.find('select');
    expect(input.length).toBe(9);
    expect(select.length).toBe(3);
  });
  it('should check `componentDidMount()`', () => {
    const { state } = container.instance();
    expect(state.firstName).toBe(user.firstName);
    expect(state.role).toBe(user.role);
    expect(state.gender).toBe(user.gender);
    expect(state.lastName).toBe(user.lastName);
    expect(state.residence).toBe(user.residence);
    expect(state.currency).toBe(user.currency);
    expect(state.emailNotifications).toBe(true);
    expect(state.email).toBe(user.email);
    expect(state.department).toBe(user.department);
    expect(state.birthdate).toBe(user.birthdate);
  });
  it('should add a file to the state', () => {
    const fileInput = container.find('input[type="file"]');
    fileInput.simulate('change', {
      target: {
        files: [{
          lastModified: 1586946320488,
          lastModifiedDate: 'Wed Apr 15 2020 12:25:20 GMT+0200 (Central Africa Time)',
          name: 'bareicon.png',
          size: 113820,
          type: 'image/png',
          webkitRelativePath: '',
        }],
        name: 'image',
      },
    });
    const { state } = container.instance();
    expect(state.image).toEqual({
      lastModified: 1586946320488,
      lastModifiedDate: 'Wed Apr 15 2020 12:25:20 GMT+0200 (Central Africa Time)',
      name: 'bareicon.png',
      size: 113820,
      type: 'image/png',
      webkitRelativePath: '',
    });
  });
  test('should change the state when language is changed', () => {
    testChange('select[name="language"]', 'language', 'French', container);
  });
  test('should change the state when currency is changed', () => {
    testChange('select[name="currency"]', 'currency', 'EUR', container);
  });
  test('should change the state when residence is changed', () => {
    testChange('input[placeholder="Residence"]', 'residence', 'Gisenyi', container);
  });
  test('should change the state when department is changed', () => {
    testChange('select[name="department"]', 'department', 'IT', container);
  });
  it('should change the state when user choose a email option', () => {
    testChange('input[type="checkbox"]', 'emailNotifications', 'optout', container);
    const emailOption = container.find('input[type="checkbox"]');
    expect(emailOption.instance().value).toBe('on');
  });
  it('should change the state when gender is changed', () => {
    testChange('input[value="Female"]', 'gender', 'Male', container);
    const genderOption = container.find('input[value="Female"]');
    expect(genderOption.instance().value).toBe('Female');
  });
  it('should change the state when the date is changed', () => {
    testChange('input[type="date"]', 'birthdate', '2005-06-05', container);
    const birthdateInput = container.find('input[type="date"]');
    expect(birthdateInput.instance().value).toBe('2005-06-05');
  });
  it('should submit the user info only', async () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const dateInput = container2.find('input[type="date"]');
    const residenceInput = container2.find('input[placeholder="Residence"]');
    const currencyInput = container2.find('select[name="currency"]');
    const languageInput = container2.find('select[name="language"]');
    const departmentInput = container2.find('select[name="department"]');
    const genderInput = container2.find('input[value="Female"]');
    dateInput.simulate('change', { target: { value: '2000-04-04', name: 'birthdate' } });
    residenceInput.simulate('change', { target: { value: 'west', name: 'residence' } });
    currencyInput.simulate('change', { target: { value: 'RWF', name: 'currency' } });
    languageInput.simulate('change', { target: { value: 'English', name: 'language' } });
    departmentInput.simulate('change', { target: { value: 'IT', name: 'department' } });
    genderInput.simulate('change', { target: { value: 'Male', name: 'gender' } });
    await form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(4);
  });
  it('should submit only image', async () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const fileInput = container2.find('input[type="file"]');
    fileInput.simulate('change', {
      target: {
        files: [{
          lastModified: 1586946320489,
          lastModifiedDate: 'Wed Apr 15 2020 12:25:20 GMT+0200 (Central Africa Time)',
          name: 'barecon.png',
          size: 113820,
          type: 'image/png',
          webkitRelativePath: '',
        }],
        name: 'image',
      },
    });
    await form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(4);
  });

  it('should  submit only image and notification option', async () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const emailOption = container2.find('input[type="checkbox"]');
    const fileInput = container2.find('input[type="file"]');
    emailOption.simulate('change', { target: { checked: true, name: 'emailNotifications', type: 'checkbox' } });
    fileInput.simulate('change', {
      target: {
        files: [{
          lastModified: 1586946320489,
          lastModifiedDate: 'Wed Apr 15 2020 12:25:20 GMT+0200 (Central Africa Time)',
          name: 'barecon.png',
          size: 113820,
          type: 'image/png',
          webkitRelativePath: '',
        }],
        name: 'image',
      },
    });
    await form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(3);
  });
  it('should submit only notification option', async () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const emailOption = container2.find('input[type="checkbox"]');
    emailOption.simulate('change', { target: { checked: true, name: 'emailNotifications', type: 'checkbox' } });
    await form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(2);
  });

  it('should stop submitting if one of the input is invalid', () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const languageInput = container2.find('input[type="date"]');
    languageInput.simulate('change', { target: { value: '', name: 'birthdate' } });
    form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(2);
  });
  it('should submit form when the form button is clicked', async () => {
    const wrapper2 = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    const container2 = wrapper2.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
    const form = container2.find('form');
    const birthdateInput = container2.find('input[type="date"]');
    const emailOption = container2.find('input[type="checkbox"]');
    const fileInput = container2.find('input[type="file"]');
    birthdateInput.simulate('change', { target: { value: '2004-07-10', name: 'birthdate' } });
    emailOption.simulate('change', { target: { checked: false, name: 'emailNotifications', type: 'checkbox' } });
    fileInput.simulate('change', {
      target: {
        files: [{
          lastModified: 1586946320489,
          lastModifiedDate: 'Wed Apr 15 2020 12:25:20 GMT+0200 (Central Africa Time)',
          name: 'barecon.png',
          size: 113820,
          type: 'image/png',
          webkitRelativePath: '',
        }],
        name: 'image',
      },
    });
    await form.simulate('submit');
    expect(dispatch.mock.calls.length).toBe(4);
  });
});

describe('test trial', () => {
  const mockStore2 = configureStore([]);
  const store2 = mockStore2({
    profile: {
      firstName: 'user',
      lastName: 'firstname',
      email: 'user@example.com',
      language: 'English',
      role: 'Requester',
      currency: 'RWF',
      residence: 'Kari',
      birthdate: '2005-03-05',
      image: null,
      profileFetchError: 'error found',
      fetchImageError: '',
      setEmailNotifError: '',
      emailNotifications: false,
      isVerified: null,
      department: 'IT',
      gender: 'Male',
    },
    user: {
      user: 'gcgchgcghghvhhjb',
    },
    language: {
      language: 'en',
    },
  });
  store2.dispatch = dispatch;

  beforeEach(() => {
    wrapper = mount(

      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store2}>
            <ConnectedProfile intl={{ formatMessage: jest.fn() }} />
          </Provider>
          ,
        </MemoryRouter>
      </IntlProvider>,
    );
    container = wrapper.childAt(0).childAt(0).childAt(0).childAt(0)
      .children()
      .children();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should have email notification to optout if the user has turn off the option on reload', () => {
    const instance = container.instance();
    instance.componentDidMount();
    const { state } = container.instance();
    expect(state.emailNotifications).toBe(false);
  });
  it('should redirect to other page if there is an error when geting user info', () => {
    container.instance().componentDidMount();
    const { state } = container.instance();
    expect(state.redirect).toBe(true);
  });
});
