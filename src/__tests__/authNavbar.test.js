import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router-dom';
import translation from '../components/languages/en.json';
import { AuthNavBar } from '../components/sharedComponents/AuthNavBar';

describe('<AuthNavBar />', () => {
  const wrapper = mount(
    <IntlProvider defaultLocale="en" locale="en" messages={translation}>
      <Router>
        <AuthNavBar intl={{ formatMessage: jest.fn() }} language={{ language: 'en', image: 'fffefefeefeff.vre/' }} token="dwedwdwdwed" selectLanguage={jest.fn(() => ({ payload: 'fr' }))} />
      </Router>
    </IntlProvider>,
  );
  it('test set language button', () => {
    const container = wrapper.childAt(0).childAt(0).childAt(0);
    container.instance().handleSelect('#fr');
    expect(container.instance().state.language).toBe('fr');
  });
});
