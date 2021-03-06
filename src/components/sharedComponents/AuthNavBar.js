import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, DropdownButton, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../scss/navbar.scss';
import '../../scss/authNavbar.scss';
import selectLanguage from '../../redux/actions/i18n';
import translate from '../languages/Translate';
import placeholder from '../../assets/users.png';
import Notification from '../notification/Notifcation';
import logo from '../../assets/logo.png';

export class AuthNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.language.language,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (evt) => {
    const newString = evt.split('#')[1];
    const actionOutput = this.props.selectLanguage(newString);
    this.setState({ language: actionOutput.payload });
  }

  render() {
    const { language } = this.state;
    const { image, token } = this.props;
    return (
      <Navbar fixed="top" expand="lg" className="nav-bar">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="barefoot nomad logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-bar_items" bsPrefix="navbar-toggler" />
        <Navbar.Collapse id="responsive-navbar-nav" bsPrefix="navbar-collapse">
          <Nav className="mr-auto" />
          <Nav>
            <Button className="nav-bar_btn text-center" href="/">
              {' '}
              {
                  translate('HOME')
                }
            </Button>
            <Nav.Link>
              <Notification token={token || localStorage.getItem('token')} />
            </Nav.Link>
            <img src={image || placeholder} alt="profile" className="nav-profile-img" />
            <DropdownButton title={language} alignRight variant="inherit" onSelect={this.handleSelect} className="select-lang" bsPrefix="nav-bar_dropdown">
              <Dropdown.Item className="lang-item" href="#en">ENGLISH</Dropdown.Item>
              <Dropdown.Item className="lang-item" href="#fr">FRANCAIS</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AuthNavBar.propTypes = {
  language: PropTypes.object,
  selectLanguage: PropTypes.func.isRequired,
  image: PropTypes.string,
  token: PropTypes.string,
};
const MapStateToProps = ({ language, user, profile }) => {
  if (user.user) {
    return {
      language,
      token: localStorage.getItem('token') || user.user.data,
      image: profile.image,
    };
  }
  return {
    language,
    token: '',
    image: profile.image,
  };
};
export default connect(MapStateToProps, { selectLanguage })(AuthNavBar);
