import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translation from '../components/languages/en.json';
import Stats from '../components/sharedComponents/Stats';

const mockStore = configureStore([]);
const store = mockStore({
  profile: {
    image: 'www.image.example',
  },
  user: {
    user: 'gcgchgcghghvhhjb',
  },
  language: {
    language: 'en',
  },
  stats: {
    stats: {
      totalTripsNumber: 4,
      upCommingTrips: 2,
      pastYears: 2,
      statusStatistics: {
        openRequests: 1,
        approvedRequests: 2,
        rejectedRequets: 1,
      },
    },
  },
});
const dispatch = jest.fn();
store.dispatch = dispatch;
const statsComponent = mount(
  <IntlProvider defaultLocale="en" locale="en" messages={translation}>
    <MemoryRouter>
      <Provider store={store}>
        <Stats />
      </Provider>
    </MemoryRouter>
  </IntlProvider>,
);
it('should render Stats component', () => {
  expect(statsComponent.exists()).toBe(true);
});
describe('stats tests', () => {
  it('should show stats for open requests', () => {
    const container = statsComponent.childAt(0).childAt(0).childAt(0).children()
      .children();
    const { stats } = container.instance().props.stats;
    expect(stats.totalTripsNumber).toBe(4);
    expect(stats.upCommingTrips).toBe(2);
    expect(stats.pastYears).toBe(2);
    expect(stats.statusStatistics.openRequests).toBe(1);
    expect(stats.statusStatistics.approvedRequests).toBe(2);
    expect(stats.statusStatistics.rejectedRequets).toBe(1);
  });
});
