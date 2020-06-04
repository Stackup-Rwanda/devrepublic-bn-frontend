import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import Facilities from '../components/facilities/Facilities';
import translation from '../components/languages/en.json';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn(() => [{
    id: 'fafwefwefwefw', content: 'this is a comment', createdAt: '2019-02-02', status: 'read',
  }]);
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockStore = configureStore([]);
const dispatch = jest.fn();
const store = mockStore({
  facilities: {
    facilities: [{
      id: '5be72db7-5510-4a50-9f15-e23f103116d5',
      facilityName: 'Marriot',
      location: 'Nairobi',
      image: '',
      createdBy: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
      numOfRooms: 4,
      amenities: null,
      services: null,
      likes: 0,
      totalRating: 0,
      averageRating: 0,
      likesId: [],
      unlikes: 0,
      unlikesId: [],
      createdAt: '2020-06-03T11:22:18.966Z',
      updatedAt: '2020-06-03T12:26:54.612Z',
      rooms: [
        {
          id: '4ef246b8-b38a-44b6-9072-90b1763c0a76',
          facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
          roomName: 'high',
          type: 'queen size',
          availability: false,
          createdAt: '2020-06-03T12:26:54.606Z',
          updatedAt: '2020-06-03T12:30:47.798Z',
        },
      ],
    }],
    facilitiesServerError: null,
  },
  profile: {
    role: 'Requester',
    image: 'www.image.example',
  },
  requests: {
    requests: [],
  },
  user: {
    user: 'eeferferfer',
  },
  language: {
    language: 'en',
  },
  dispatch,
});
const store2 = mockStore({
  facilities: {
    facilities: [{
      id: '5be72db7-5510-4a50-9f15-e23f103116d5',
      facilityName: 'Marriot',
      location: 'Nairobi',
      image: '',
      createdBy: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
      numOfRooms: 4,
      amenities: null,
      services: null,
      likes: 2000,
      totalRating: 0,
      averageRating: 0,
      likesId: [],
      unlikes: 0,
      unlikesId: [],
      createdAt: '2020-06-03T11:22:18.966Z',
      updatedAt: '2020-06-03T12:26:54.612Z',
      rooms: [
        {
          id: '4ef246b8-b38a-44b6-9072-90b1763c0a76',
          facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
          roomName: 'high',
          type: 'queen size',
          availability: false,
          createdAt: '2020-06-03T12:26:54.606Z',
          updatedAt: '2020-06-03T12:30:47.798Z',
        },
      ],
    }],
    facilitiesServerError: null,
  },
  profile: {
    role: 'Requester',
    image: 'www.image.example',
  },
  requests: {
    requests: [{
      destination: 'Nairobi',
      requestId: 'fvevefergegwerg',
    }],
  },
  user: {
    user: 'eeferferfer',
  },
  language: {
    language: 'en',
  },
  dispatch,
});

describe('<Facilities>', () => {
  it('render correctly Facilities component', () => {
    const container = (
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>
    );
    const DateInputComponent = renderer.create(container).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
  });
  it('it should open a pop when use click on the book button', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    bookButton.simulate('click');
    expect(element.instance().state.show).toBeTruthy();
    expect(element.instance().state.facilityId).toBe('5be72db7-5510-4a50-9f15-e23f103116d5');
    expect(element.instance().state.facilityName).toBe('Marriot');
    expect(element.instance().state.location).toBe('Nairobi');
    expect(element.instance().state.rooms[0].roomName).toBe('high');
    expect(element.instance().state.rooms[0].id).toBe('4ef246b8-b38a-44b6-9072-90b1763c0a76');
    expect(element.instance().state.roomId).toBe('');
    expect(element.instance().state.checkin).toBe((new Date()).toISOString().substr(0, 10));
    expect(element.instance().state.checkout).toBe((new Date()).toISOString().substr(0, 10));
  });
  it('it should change the state when the input value are change', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    const checkIn = element.find('input[name="checkin"]');
    const checkOut = element.find('input[name="checkout"]');
    bookButton.simulate('click');
    checkIn.simulate('change', { target: { value: '2020-07-07', name: 'checkin' } });
    checkOut.simulate('change', { target: { value: '2020-07-17', name: 'checkout' } });
    expect(element.instance().state.checkin).toBe('2020-07-07');
    expect(element.instance().state.checkout).toBe('2020-07-17');
  });
  it('it should cancel book when user click on Cancel', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    const cancelButton = element.find('.cancel-booking button');
    bookButton.simulate('click');
    cancelButton.simulate('click');
    expect(element.instance().state.show).toBeFalsy();
    expect(element.instance().state.rooms).toEqual([]);
    expect(element.instance().state.facilityId).toBe(null);
    expect(element.instance().state.facilityName).toEqual(null);
  });
  it('it should cancel book when user click on Cancel', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    const bookingButton = element.find('.booking-button button');
    bookButton.simulate('click');
    bookingButton.simulate('click');
    expect(element.instance().state.show).toBeTruthy();
  });
  it('like a facility', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const likeButton = element.find('.like-button');
    likeButton.simulate('click');
    expect(dispatch.mock.calls.length).toBe(0);
    expect(element.instance().state.show).toBeFalsy();
    expect(element.find('.total-likes').instance().textContent).toBe('0');
  });
  it('it should not book when the check in date equals the checkout date', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    const select = element.find('select');
    const bookingButton = element.find('.booking-button button');
    bookButton.simulate('click');
    select.simulate('change', { target: { value: '4ef246b8-b38a-44b6-9072-90b1763c0a76', name: 'roomId' } });
    bookingButton.simulate('click');
    expect(element.instance().state.roomId).toBe('4ef246b8-b38a-44b6-9072-90b1763c0a76');
  });
  it('it should not book when the check in date doesn\'t equals the checkout date but the user hasn\'t visited the facility', () => {
    const container = mount(
      <IntlProvider defaultLocale="en" locale="en" messages={translation}>
        <MemoryRouter>
          <Provider store={store2}>
            <Facilities intl={{ formatMessage: jest.fn() }} />
          </Provider>
        </MemoryRouter>

      </IntlProvider>,
    );
    const element = container.childAt(0).childAt(0).childAt(0).childAt(0)
      .childAt(0)
      .children();
    const bookButton = element.find('.book-facility');
    const select = element.find('select');
    const bookingButton = element.find('.booking-button button');
    bookButton.simulate('click');
    select.simulate('change', { target: { value: '4ef246b8-b38a-44b6-9072-90b1763c0a76', name: 'roomId' } });
    bookingButton.simulate('click');
    expect(element.instance().state.roomId).toBe('4ef246b8-b38a-44b6-9072-90b1763c0a76');
    expect(element.find('.total-likes').instance().textContent).toBe('2.00k');
  });
});
