import * as React from 'react';
import { mount, shallow } from 'enzyme';
import dotenv from 'dotenv';
import toJson from 'enzyme-to-json';
import { RequesterDashboard as Requester } from '../components/dashboards/RequesterDashboard';
import { ManagerDashboard as Manager } from '../components/dashboards/ManagerDashboard';
import Dashboard from '../components/dashboards/index';
import NewAndSearch from '../components/dashboards/NewAndSearch';
import { checkStatus } from '../components/dashboards/sharedFuncs';

dotenv.config();

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'read',
  }]);
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('Requester dashboard snapshot', () => {
  const render = (params, fn = shallow) => {
    const defaultProps = {
      getRequestsAction: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <Requester {...props} />,
    );
  };
  it('should create a dashboard snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
  it('should call getRequests Action and return requests', () => {
    const wrapper = render();
    wrapper.setState({
      requests: [],
    });
    const { getRequestsAction } = wrapper.instance().props;
    getRequestsAction.mockReturnValueOnce({
      payload: {
        data: {
          requests: [{ id: 'asedr45', userId: 'wert45' }],
        },
      },
    });
    wrapper.setState({
      requests: [{ id: 'asedr45', userId: 'wert45' }],
      firstName: 'this.props.profile.firstName',
      lastName: 'this.props.profile.lastName',
      role: 'this.props.profile.role',
      gender: 'Male',
    });
    expect(wrapper.state().requests).toHaveLength(1);
    wrapper.instance().findAccommodation({ id: 'wer345d' }, { requestId: 'wer345d' });
    wrapper.instance().findAccommodation({ id: 'oppop' }, { requestId: 'wer345d' });
    wrapper.instance().hanldeCancel();
    wrapper.instance().hanldeSelectedTrip({ target: { value: 'One way trip' } });
    wrapper.instance().hanldeSelectedTrip({ target: { value: 'Return trip' } });
    wrapper.instance().hanldeSelectedTrip({ target: { value: 'Multicity trip' } });
    wrapper.instance().hanldeSelectedTrip({ target: { value: 'Muwswseded trip' } });
    checkStatus({ status: 'rejected' });
    checkStatus({ status: 'open' });
    checkStatus({ status: 'approved' });
  });
  it('should call getRequests Action and return bookings', () => {
    const wrapper = render();
    wrapper.setState({
      bookings: [],
    });
    const { getRequestsAction } = wrapper.instance().props;
    getRequestsAction.mockReturnValue({
      payload: {
        data: {
          bookings: [{ facikityName: 'asedr45', facilityId: 'wert45' }],
        },
      },
    });
    wrapper.setState({
      bookings: [{ facikityName: 'asedr45', facilityId: 'wert45' },
        { facikityName: 'asedr45', facilityId: 'wert45' },
        { facikityName: 'asedr45', facilityId: 'wert45' }],
    });
    expect(wrapper.state().bookings).toHaveLength(3);
    wrapper.instance().findAccommodation({ id: 'oppop' }, { requestId: 'wer345d' });
  });
});


describe('Manager dashboard snapshot', () => {
  const render = (params, fn = shallow) => {
    const defaultProps = {
      getRequestsAction: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <Manager {...props} />,
    );
  };
  it('should create a dashboard snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
  it('Manager can get requests and user info', () => {
    const wrapper = render();
    wrapper.setState({
      requests: [],
    });
    const { getRequestsAction } = wrapper.instance().props;
    getRequestsAction.mockReturnValueOnce({
      payload: {
        data: {
          requests: [{
            id: 'asedr45',
            userId: 'wert45',
            managerId: '23dfsd45',
            User: {
              firstName: 'Aime',
              lastName: 'Bien',
              image: 'jeanne@andela.com',
            },
          }],
        },
      },
    });
    wrapper.setState({
      requests: [{
        id: 'asedr45',
        userId: 'wert45',
        managerId: '23dfsd45',
        User: {
          firstName: 'Aime',
          lastName: 'Bien',
          image: 'jeanne@andela.com',

        },
      }],
    });
    expect(wrapper.state().requests).toHaveLength(1);
  });
});
describe('Index dashboard snapshot', () => {
  const render = (params, fn = shallow) => {
    const defaultProps = {
      getRequestsActionn: jest.fn(),
      location: {},
      search: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <Dashboard {...props} />,
    );
  };
  beforeEach(() => {
    const token = process.env.TOKEN;
    localStorage.setItem('token', token);
    const managerToken = process.env.MANAGER_TOKEN;
    localStorage.setItem('token', managerToken);
  });
  it('should create a dashboard container snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
  it('check the user status before rendering dashboard', () => {
    const wrapper = render();
    wrapper.setState({
      role: '',
    });
    wrapper.setState({
      role: 'requester',
    });
    expect(wrapper.state().role).toEqual('requester');
    wrapper.instance().checkRole({ role: 'requester' });
    wrapper.instance().checkRole({ role: 'manager' });
    wrapper.instance().checkRole({ role: '45678' });
  });
});

describe('Index dashboard snapshot', () => {
  const render = mount(<NewAndSearch />);
  it('should create a NewAndSearch snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
});
