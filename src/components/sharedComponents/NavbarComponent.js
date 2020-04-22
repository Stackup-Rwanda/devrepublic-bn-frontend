import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Navbar, Nav, Dropdown, DropdownButton, Button,
} from 'react-bootstrap';
import '../../scss/navbar.scss';
import logo from '../../assets/logo.png';
import { selectLanguage } from '../../redux/actions/i18n';
import translate from '../languages/Translate';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language.language,
    };
  }

  handleSelect = (evt) => {
    const newString = evt.split('#')[1];
    const actionOutput = this.props.selectLanguage(newString);
    this.setState({ language: actionOutput.payload });
  }

  render() {
    const { language } = this.state;
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
            <Nav.Link href="/login" className="nav-bar_item">
              {
                  translate('Log In')
                }
            </Nav.Link>
            <Button className="nav-bar_btn">
              {
                   translate('Register')
                 }
            </Button>

            <DropdownButton className="test" title={language} onSelect={this.handleSelect} alignRight variant="inherit" bsPrefix="nav-bar_dropdown">
              <Dropdown.Item className="lang-item" href="#en">ENGLISH</Dropdown.Item>
              <Dropdown.Item className="lang-item" href="#fr">FRANCAIS</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const MapStateToProps = ({ language }) => ({
  language,
});
export default connect(MapStateToProps, { selectLanguage })(NavBarComponent);
export { NavBarComponent };

NavBarComponent.propTypes = {
  language: PropTypes.object,
  selectLanguage: PropTypes.func,

};
