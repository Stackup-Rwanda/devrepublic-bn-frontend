import * as React from 'react';
import { shallow } from 'enzyme';
import dotenv from 'dotenv';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { AdminDashboard } from '../components/dashboards/admin';
import Dashboard from '../components/dashboards/index';
import { PopUp } from '../components/popUp';

dotenv.config();

const user = {
  birthdate: null,
  createdAt: '2020-05-18T13:34:13.981Z',
  currency: null,
  department: null,
  email: 'jean@by.com',
  emailNotifications: true,
  firstName: 'dev',
  gender: null,
  id: '1234',
  image: null,
  isVerified: true,
  language: null,
  lastName: 'devrpo',
  managerId: '12345',
  managerName: 'muhoza',
  oAuthId: 'none',
  residence: null,
  role: 'requester',
  signupMethod: 'none',
  updatedAt: '2020-05-18T13:34:13.981Z',
};

describe('Super Admin dashboard snapshot', () => {
  const dashboardRender = (params, fn = shallow) => {
    const defaultProps = {
      getUsersAction: jest.fn(),
      setRoleAction: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <AdminDashboard {...props} />,
    );
  };
  it('should create a dashboard snapshot', () => {
    expect(toJson(dashboardRender)).toMatchSnapshot();
  });
  it('should call getUsers Action and return users', () => {
    const wrapper = dashboardRender();
    wrapper.setState({
      users: [],
    });
    const { getUsersAction } = wrapper.instance().props;
    getUsersAction.mockReturnValueOnce({
      payload: {
        data: {
          users: [{ id: 'asedr45', email: 'mail@mail.com' }],
        },
      },
    });
    wrapper.setState({
      users: [user],
    });

    expect(wrapper.state().users).toHaveLength(1);
    const button = wrapper.find('.set-role-drop');
    act(() => {
      button.simulate('click');
    });
    wrapper.instance().handleSetRolePopUp('visible', user);
    wrapper.instance().updateUsers([user]);
  });
});

describe('pop Up snapshot', () => {
  const popUpRender = (params, fn = shallow) => {
    const defaultProps = {
      users: [user],
      roles: ['manager', 'travel team member', 'requester', 'travel administrator', 'supplier', 'super administrator'],
      isPopUpActive: '',
      handleVisibility: jest.fn(),
      activeItem: user,
      getUsersAction: jest.fn(),
      setRoleAction: jest.fn(),
      updateUsers: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <PopUp {...props} />,
    );
  };
  it('should create a dashboard snapshot', () => {
    expect(toJson(popUpRender)).toMatchSnapshot();
  });
  it('should submit a form with all info', async () => {
    const popUpWrapper = popUpRender();
    popUpWrapper.setState({
      roles: [],
      email: 'mugisha@gmail.com',
      role: 'requester',
      errorMessage: '',
      alertVisible: false,
      textColor: '',
    });
    const { getUsersAction, setRoleAction } = popUpWrapper.instance().props;
    getUsersAction.mockReturnValueOnce({
      payload: {
        data: {
          users: [{ id: 'asedr45', email: 'mail@mail.com' }],
        },
      },
    });
    setRoleAction.mockReturnValueOnce({
      payload: {
        data: {
          message: 'success',
          status: 200,
        },
      },
    });
    popUpWrapper.setState({
      users: [user],
    });
    const submitButton = popUpWrapper.find('.submit-pop-up');
    const cancelButton = popUpWrapper.find('.cancel-pop-up');
    act(() => {
      const event = { preventDefault: jest.fn() };
      submitButton.simulate('click', event);
      cancelButton.simulate('click');
      popUpWrapper.find('.role-field').simulate('change', { target: { value: 'requester' } });
    });
    expect(submitButton.length).toBe(1);
    expect(cancelButton.length).toBe(1);
  });
});

describe('Index dashboard snapshot', () => {
  const render = (params, fn = shallow) => {
    const defaultProps = {
      getUsersActionn: jest.fn(),
      setRolesActionn: jest.fn(),
      location: {},
      search: jest.fn(),
    };
    const props = { ...defaultProps, ...params };
    return fn(
      <Dashboard {...props} />,
    );
  };
  beforeEach(() => {
    localStorage.setItem('token', process.env.ADMIN_TOKEN);
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
      role: 'super administrator',
    });
    expect(wrapper.state().role).toEqual('super administrator');
    wrapper.instance().checkRole({ role: 'super administrator' });
  });
});
