import React from 'react';
import {
  Navbar, Nav, Dropdown, DropdownButton, Button,
} from 'react-bootstrap';
import '../../scss/navbar.scss';
import logo from '../../assets/logo.png';

const NavBarComponent = () => (
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
        <Nav.Link href="/login" className="nav-bar_item">Log In</Nav.Link>
        <Button className="nav-bar_btn">Start Now</Button>
        <DropdownButton title="EN" alignRight variant="inherit" bsPrefix="nav-bar_dropdown">
          <Dropdown.Item href="#/action-1">EN</Dropdown.Item>
          <Dropdown.Item href="#/action-2">FR</Dropdown.Item>
        </DropdownButton>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBarComponent;
