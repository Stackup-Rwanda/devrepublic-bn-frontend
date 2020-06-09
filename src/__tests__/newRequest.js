import * as React from 'react';
import { shallow } from 'enzyme';
import Buttons from '../components/dashboards/createRequest/Buttons';
import { OnewayTrip as Oneway } from '../components/dashboards/createRequest/OnewayTrip';
import { ReturnTrip as Return } from '../components/dashboards/createRequest/ReturnTrip';
import { MulticityTrip as Multicity } from '../components/dashboards/createRequest/MulticityTrip';
import TripTypeModal from '../components/dashboards/createRequest/TripTypeModal';
import Reusable from '../components/dashboards/createRequest/ReUsable';
import {
  handleLocationInputs, handleActionOutput, handleReasonInputs, handleDepartureDate, handleDestinationInputs, handleReturnDate, handleUserInfo,
} from '../components/dashboards/createRequest/sharedFunc';

describe('Shared buttons Tests', () => {
  const wrapper = shallow(<Buttons spinner />);
  it('Should Render buttons component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe('TripTypeModal component Tests', () => {
  const wrapper = shallow(<TripTypeModal />);
  it('Should Render TripTypeModal component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should call handleModalContent function', () => {
    wrapper.instance().handleModalContent();
  });
});
describe('Reusable component Tests', () => {
  const wrapper = shallow(<Reusable />);
  it('Should Render Reusable component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe('Oneway component Tests', () => {
  const wrapper = shallow(<Oneway createOnewayAction={jest.fn()} />);
  it('Should Render reusable component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should call createOnewayAction Action and return requests', () => {
    wrapper.setState({
      newRequests: [],
    });
    wrapper.instance().handleCreate();
    wrapper.instance().handleDisablesBtn();
    handleDepartureDate({ state: 'any state', setState: jest.fn() }, { target: { value: 'kigali' } });
    handleDepartureDate({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: '2020-09-09' } });
    handleReasonInputs({ state: 'any state', setState: jest.fn() }, { target: { value: 'reason' } });
    handleReasonInputs({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: 'reason aqaqaqaqaqaqaqaqqqaqaqa' } });
    handleDestinationInputs({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: 'destination' } });
    handleDestinationInputs({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: '' } });
    handleLocationInputs({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: 'location' } });
    handleLocationInputs({ state: 'any state', setState: jest.fn(), handleDisablesBtn: jest.fn() }, { target: { value: '' } });
    handleUserInfo({
      state: 'any state', setState: jest.fn(), firstName: 'aaaaaa', gender: 'Male', role: 'requester',
    });
    handleUserInfo({
      state: 'any state', setState: jest.fn(), firstName: '', gender: '', role: '',
    });
  });
  it('should handle handleActionOutput function', () => {
    handleActionOutput({ state: 'any state', setState: jest.fn() }, { payload: { status: 201 } });
    handleActionOutput({ state: 'any state', setState: jest.fn() }, { payload: { status: 500 } });
    handleActionOutput({ state: 'any state', setState: jest.fn() }, { payload: { status: 409 } });
    handleActionOutput({ state: 'any state', setState: jest.fn() }, { payload: { error: 'Please enter valid return date according to your stops and actual departure date' } });
    handleActionOutput({ state: 'any state', setState: jest.fn() }, { payload: { error: 'user should have manager before performing this operation' } });
    handleActionOutput({
      state: 'any state', setState: jest.fn(),
    }, { payload: { error: 'Please enter valid return date according to your stops and actual departure date' } });
  });
});
describe('ReturnTrip component Tests', () => {
  const wrapper = shallow(<Return createReturnTripAction={jest.fn()} />);
  it('Should Render ReturnTrip component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should call createReturnTripAction', () => {
    wrapper.setState({
      newRequests: [],
    });
    wrapper.instance().handleCreate();
    wrapper.instance().handleDisablesBtn();
    wrapper.instance().handleReturnDate({ target: { value: '2020-08-09' } });
  });
});
describe('Multicity component Tests', () => {
  const wrapper = shallow(<Multicity createMultiCityTripAction={jest.fn()} />);
  it('Should Render Multicity component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should call createMultiCityTripAction', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'kigali' } });
    wrapper.instance().handleCreate();
    wrapper.instance().handleDisablesBtn();
    wrapper.instance().hanldeAddStops();
    wrapper.instance().handleRemoveStops();
    wrapper.instance().handleReturnDate({ target: { value: '2020-08-09' } });
    wrapper.instance().handleStopLocationInputs({ target: { value: '2020-08-09' } });
    wrapper.instance().handleStopArrivalDateInputs({ target: { value: '2020-08-09' } });
    wrapper.instance().handleStopDepartureDateInputs({ target: { value: '2020-08-09' } });
    wrapper.instance().handleStopReasonInputs({ target: { value: '2020-08-09' } });
  });
});
