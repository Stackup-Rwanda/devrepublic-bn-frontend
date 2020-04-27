
import * as React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/sharedComponents/Footer';
import NavBar from '../components/sharedComponents/NavbarComponent';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';


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
describe('Navbar Tests', () => {
  const wrapper = shallow(<NavBar />);
  it('Should Render navbar component', () => {
    expect(wrapper.exists()).not.toBe(null);
  });
  it('Should contain a nav class', () => {
    expect(wrapper.find('.nav-bar').length).toBe(1);
  });
});
