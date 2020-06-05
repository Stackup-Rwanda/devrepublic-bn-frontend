import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '../components/sharedComponents/Footer';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';
import { NavBarComponent as NavBarCompo } from '../components/sharedComponents/NavbarComponent';

describe('Not found page Tests', () => {
  const wrapper = shallow(<NotFound />);
  it('Should Render footer component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe('Home page Tests', () => {
  const wrapper = shallow(<Home />);
  it('Should Render footer component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe('Footer Tests', () => {
  const wrapper = shallow(<Footer />);
  it('Should Render footer component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should conatain footer class', () => {
    expect(wrapper.find('.fixed-bottom').length).toBe(1);
  });
});
describe('Navbar class component snapshot', () => {
  const render = (fn = shallow) => {
    const defaultProps = {
      langauge: '',
      selectLanguage: jest.fn().mockReturnValue({ payload: '' }),
    };
    return fn(
      <NavBarCompo {...defaultProps} />,
    );
  };
  it('should create a snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
});
