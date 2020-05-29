import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../../../scss/newRequest.scss';
import translate from '../../languages/Translate';

class Buttons extends Component {
  render() {
    const {
      handleCreate, hanldeCancel, spinner, disabled,
    } = this.props;
    return (
      <div>
        <div>
          <Button variant="primary" className="create-btn mt-3" onClick={handleCreate} disabled={disabled}>
            { spinner ? <Spinner animation="border" size="sm" /> : ''}
            { translate('Create') }
          </Button>
          <Button variant="primary" className="cancel-btn mt-3 ml-3" onClick={hanldeCancel}>
            { translate('Cancel') }
          </Button>
        </div>
      </div>
    );
  }
}

export default Buttons;
Buttons.propTypes = {
  disabled: PropTypes.bool,
  spinner: PropTypes.bool,
  hanldeCancel: PropTypes.func,
  handleCreate: PropTypes.func,
};
