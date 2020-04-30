import React from 'react';
import { shallow } from 'enzyme';
import SocialLogin from '../components/authentication/SocialLogin';

const testLogin = (name) => {
  const wrapper = shallow(<SocialLogin name={name} />);
  const result = wrapper.props();
  expect(result.href).toEqual(expect.stringContaining(`/api/v1/auth/${name}`));
};
describe('social login componet', () => {
  it('renders correctly', () => {
    const Component = <SocialLogin name="google" />;
    expect(Component).toMatchSnapshot();
  });
  it('should have a link element with google in the href', () => {
    testLogin('google');
  });
  it('should have a link element with facebook in the href', () => {
    testLogin('facebook');
  });
});
