import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Routes from '../views/routes';
import 'react-toastify/dist/ReactToastify.css';
import localeEn from './languages/en.json';
import localeFr from './languages/fr.json';


const data = {
  fr: localeFr,
  en: localeEn,
};

export class App extends Component {
  render() {
    const { language } = this.props;
    return (
      <IntlProvider defaultLocale="en" locale={language.language} messages={data[language.language]}>
        <BrowserRouter>
          <ToastContainer />
          <Routes />
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
const MapStateToProps = ({ language }) => ({
  language,
});
export default connect(MapStateToProps)(App);

App.propTypes = {
  language: PropTypes.object,
};
