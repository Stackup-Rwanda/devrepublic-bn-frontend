import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Home from '../components/sharedComponents/home';

const defaultProps = {
  history: { push: jest.fn() },
  user: {},
};


const wrapper = shallow(<Home {...defaultProps} />);

describe('Redirect from home page', () => {
  it('should redirect to signup page', () => {
    const button = wrapper.find('.signup-btn');
    act(() => {
      button.simulate('click', { target: { value: 'Signup' } });
    });
  });

  it('should redirect to login', () => {
    const button = wrapper.find('.signin-btn');
    act(() => {
      button.simulate('click', { target: { value: 'login' } });
    });
  });
});
