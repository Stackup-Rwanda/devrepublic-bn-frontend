import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Select from '../components/sharedComponents/MainPanel';

describe('<MainPanel />', () => {
  const filter = jest.fn();
  it('render correctly date component', () => {
    const container = (
      <Select allTrips={[{ status: 'open' }, { status: 'open' }]} filter={filter} />
    );
    const DateInputComponent = renderer.create(container).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
  });
  it('should change the trips shown when the select tag in clicked', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }, { status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const select = container.find('select');
    select.simulate('change', { target: { value: 'open' } });
    expect(container.instance().state.filter).toBe('open');
  });
  it('should move to the next page when user click on the arrow right button', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const select = container.find('.right');
    select.simulate('click');
    expect(container.instance().state.currentPage).toBe(2);
    expect(container.find('h5').instance().textContent).toBe('2');
  });
  it('should stay on the last page on the when the arrow right is click and the user is on the last page', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const select = container.find('.right');
    select.simulate('click');
    expect(container.instance().state.currentPage).toBe(1);
    expect(container.find('h5').instance().textContent).toBe('1');
  });
  it('should go on the next page when the user has selected the all filter', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const select = container.find('select');
    const arrowRight = container.find('.right');
    select.simulate('change', { target: { value: 'open' } });
    arrowRight.simulate('click');
    expect(container.instance().state.currentPage).toBe(2);
    expect(container.find('h5').instance().textContent).toBe('2');
  });
  it('should show the previous page when the arrow left is click', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }, { status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const arrowRight = container.find('.right');
    arrowRight.simulate('click');
    const arrowLeft = container.find('.left');
    arrowLeft.simulate('click');
    expect(container.instance().state.currentPage).toBe(1);
    expect(container.find('h5').instance().textContent).toBe('1');
  });
  it('should stay on the first page if user clicks on the left arrow button', () => {
    const container = mount(<Select allTrips={[{ status: 'open' }, { status: 'open' }, { status: 'open' }]} filter={filter} />);
    const { state } = container.instance();
    expect(state).toEqual({ filter: 'all', currentPage: 1 });
    const arrowLeft = container.find('.left');
    arrowLeft.simulate('click');
    expect(container.instance().state.currentPage).toBe(1);
    expect(container.find('h5').instance().textContent).toBe('1');
  });
});
