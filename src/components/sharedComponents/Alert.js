import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../scss/login.scss';

const ErrorAlert = ({ message, visible, textColor }) => (
  <Alert color="info" className={`text-${textColor} alert-error`} isOpen={visible}>
    {message}
  </Alert>
);
ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  textColor: PropTypes.string.isRequired,

};
export default ErrorAlert;
