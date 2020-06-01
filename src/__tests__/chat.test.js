import * as React from 'react';
import { shallow } from 'enzyme';
import dotenv from 'dotenv';
// import { act } from 'react-dom/test-utils';
import io from 'socket.io-client';
import toJson from 'enzyme-to-json';
import Chat from '../components/chat/chat';

dotenv.config();
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    createdAt: '2020-06-05T09:21:33.727Z',
    email: 'umuhozad@andela.com',
    id: 1,
    image: null,
    message: 'hi there',
    updatedAt: '2020-06-05T09:21:33.727Z',
    userId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
    userName: 'Muhoza devrpore',
  }]);
  const socket = { emit, on };
  return jest.fn(() => socket);
});


describe('Super Admin dashboard snapshot', () => {
  beforeEach(() => {
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
  });
  const dashboardRender = (params, fn = shallow) => {
    const defaultProps = {
      token: 'thisismytoken',
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <Chat {...props} />,
    );
  };
  it('should create a dashboard snapshot', () => {
    expect(toJson(dashboardRender)).toMatchSnapshot();
  });
  it('should call the socket', () => {
    const chatWrapper = dashboardRender();
    chatWrapper.setState({
      textMessage: '',
      chatHistory: [{
        createdAt: '2020-06-05T09:21:33.727Z',
        email: 'umuhozad@andela.com',
        id: 1,
        image: null,
        message: 'hi there',
        updatedAt: '2020-06-05T09:21:33.727Z',
        userId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
        userName: 'Muhoza devrpore',
      }],
      onlineUsers: [{
        birthdate: null,
        createdAt: '2020-06-05T09:03:36.799Z',
        currency: null,
        department: null,
        email: 'jdev@andela.com',
        emailNotifications: true,
        firstName: 'Paul',
        gender: null,
        id: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
        image: 'http://res.cloudinary.com/dysa6ikka/image/upload/v1589801097/hecx0mei0ur7iyuikxbz.jpg',
        isVerified: true,
        language: null,
        lastName: 'Jean',
        managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
        managerName: 'Muhoza devrpore',
        oAuthId: 'none',
        residence: null,
        role: 'requester',
        signupMethod: 'none',
        updatedAt: '2020-06-05T09:03:36.799Z',
      }],
    });
  });
});
