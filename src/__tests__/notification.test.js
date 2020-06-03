import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { mount } from 'enzyme';
import io from 'socket.io-client';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import Notification from '../components/notification/Notifcation';
import translation from '../components/languages/en.json';

dotenv.config();
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'read',
  }]);
  const socket = { emit, on, connect: jest.fn() };
  return jest.fn(() => socket);
});

describe('<Notification>', () => {
  beforeEach(() => {
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
  });
  it('render correctly date component', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const DateInputComponent = renderer.create(container).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
  });
  it('sends data on login and subscribes for response', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    mount(container);
    expect(io).toHaveBeenCalledWith(process.env.BACKEND_LINK, { query: { token: 'thisisatoken' } });
  });
  it('should have default state', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container);
    const defaultState = wrapper.childAt(0).instance().state;
    expect(defaultState).toEqual({
      show: false, showMore: false, notifications: [], error: false,
    });
  });
  it('should have default state', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    wrapper.setState({
      notifications: [{
        id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'unread',
      }],
    });
    wrapper.find('.notification-item');
    const { state } = wrapper.instance();
    expect(state.notifications).toEqual([{
      id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'unread',
    }]);
  });
  it('should show the notification panel when the icon is click', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    const bell = wrapper.find('.notification-bell');
    const notificationPanel = wrapper.find('.notif-panel');
    bell.simulate('click');
    const { state } = wrapper.instance();
    expect(state.show).toBe(true);
    expect(notificationPanel.instance().style.height).toBe('280px');
  });
  it('should show more notification when view more button is clicked', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    const viewMore = wrapper.find('#view-more');
    const notificationPanel = wrapper.find('.notif-panel');
    viewMore.simulate('click');
    const { state } = wrapper.instance();
    expect(state.showMore).toBe(true);
    expect(notificationPanel.instance().style.height).toBe('440px');
  });
  it('should show an error message if all notifications are already seen', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    const errorMessage = wrapper.find('p span');
    wrapper.setState({ error: true });
    expect(errorMessage.instance().style.display).toBe('block');
  });
  it('should sent all notifications as read', () => {
    axios
      .patch.mockImplementationOnce(() => Promise.resolve({ response: { data: { status: 200 } } }));
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    const readAll = wrapper.find('#mark-all');
    readAll.simulate('click');
  });
  it('should show error message when user has read all notif but click on the read all button', () => {
    axios
      .patch
      .mockImplementationOnce(
        () => Promise.reject(new Error({ response: { data: { status: 200 } } })),
      );
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    const readAll = wrapper.find('#mark-all');
    readAll.simulate('click');
  });
  it('should show an error message if all notifications are already seen', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    wrapper.instance().setNotification(JSON.stringify({
      notif: [{
        id: 'wewdwd', content: 'this is another comment', status: 'read', createdAt: '2019-04-04',
      }],
    }));
    const { state } = wrapper.instance();
    expect(state.notifications).toEqual([{
      id: 'wewdwd', content: 'this is another comment', status: 'read', createdAt: '2019-04-04',
    }]);
  });
  it('test if new notifications are added to the notfications array', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    wrapper.setState({
      notifications: [{
        id: 'wewdwfed', content: 'this is the first comment', status: 'unread', createdAt: '2019-04-06',
      }],
    });
    wrapper.instance().setNewNotif(JSON.stringify({
      id: 'wewdwd', content: 'this is another comment', status: 'read', createdAt: '2019-04-04',
    }));
    const { state } = wrapper.instance();
    expect(state.notifications[0]).toEqual({
      id: 'wewdwd', content: 'this is another comment', status: 'read', createdAt: '2019-04-04',
    });
  });
  it('test setError', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <Notification token="thisisatoken" />
      </IntlProvider>
    );
    const wrapper = mount(container).childAt(0);
    wrapper.setState({ error: true });
    wrapper.instance().setError();
    const { state } = wrapper.instance();
    expect(state.error).toBe(false);
  });
});
