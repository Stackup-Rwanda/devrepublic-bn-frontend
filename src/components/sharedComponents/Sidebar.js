
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../scss/sidebar.scss';
import translate from '../languages/Translate';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState((prevState) => ({
      slide: !prevState.slide,
    }));
  }

  render() {
    const { slide } = this.state;
    const style = {
      display: slide ? 'block' : 'none',
    };
    const buttonStyle = {
      left: slide ? '194px' : '2px',
    };
    return (
      <div className="wrapper">
        <div className="sidebar" style={style}>
          <Route>
            {this.props.children}
          </Route>
        </div>
        <button type="button" style={buttonStyle} onClick={this.handleChange}>{slide ? translate('close') : translate('open')}</button>
      </div>
    );
  }
}

SideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SideBar;
