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
import bell from '../../assets/notificationbell.png';
import placeholder from '../../assets/users.png';
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
    const { image } = this.props;
    return (
      <Navbar fixed="top" expand="lg" className="nav-bar">
        <Navbar.Brand href="#home">
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
            <Button className="nav-bar_btn">
              {' '}
              {
                  translate('HOME')
                }
            </Button>
            <Nav.Link>
              <img src={bell} alt="bell" className="notification-bell" />
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
};
const MapStateToProps = ({ language, profile }) => ({
  language,
  image: profile.image,
});
export default connect(MapStateToProps, { selectLanguage })(AuthNavBar);
