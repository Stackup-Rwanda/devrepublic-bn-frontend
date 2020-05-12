/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import reduxStore from '../store';
import App from '../components/App';
import Routes from '../views/routes';
import Login from '../components/authentication/Login';
import NotFoundPage from '../components/sharedComponents/notFound';

test('ROUTES TESTS. Invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/98hunungytf']}>
      <Routes />
    </MemoryRouter>,
  );
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});
test('Test ROUTES IN APP.js', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/login']}>
      <Provider store={reduxStore}>
        <App>
          <Routes />
        </App>
      </Provider>
      ,
    </MemoryRouter>,
  );
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});
describe('App snapshot', () => {
  const render = (fn = mount) => {
    const defaultProps = {
      history: {},
      push: jest.fn(),
    };
    return fn(
      <Provider store={reduxStore}>
        <App {...defaultProps} />
      </Provider>,
    );
  };
  it('should create a snapshot', () => {
    expect(toJson(render)).toMatchSnapshot();
  });
});
