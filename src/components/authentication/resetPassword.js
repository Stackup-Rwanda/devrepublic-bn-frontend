/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../sharedComponents/Alert';
import { resetPasswordAction } from '../../redux/actions/resetPassword';
import '../../scss/password.scss';

const resetPassword = (props) => {
  const token = props.location.search.split('token=')[1];
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [textColor, setTextColor] = useState('');
  const [validationClassName, SetValidation] = useState('form-check text-center');
  const [loadingClassName, setLoadingClassName] = useState('spinner-border-sm');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingClassName('spinner-border spinner-border-sm');
    const output = await props.resetPasswordAction(password, token);
    if (output.payload.status === 200) {
      setErrorMessage(output.payload.data.message);
      props.history.push('/dashboard');
    }
    if (output.type === 'RESET_PASSWORD_ERROR') {
      setErrorMessage(output.payload.data.error);
    }
    setLoading(false);
    setLoadingClassName('spinner-border-sm');
    setVisible(true);
    setTextColor('danger');
  };
  const handleChange = async (e) => {
    setPassword(e.target.value);
    setVisible(false);
    SetValidation('was-validated form-check text-center');
  };
  return (
    <div className="content">
      <div className="container p-5 justify-content-md-center">
        <form
          className={validationClassName}
          onSubmit={handleSubmit}
        >
          <div className="form-group justify-content-center align-items-center">
            <h1> Reset your password </h1>
            <Alert message={errorMessage} visible={visible} textColor={textColor} otherClassName="center col-md-4" />
            <input
              type="password"
              className="form-control text-center center col-md-4"
              pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}"
              placeholder="New Password"
              value={password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback text-lg-center">
              Use a password of at least 8 characters:
              uppercase, lowercase letters, numbers and special characters.
            </div>
          </div>
          <button type="submit" className="btn btn-primary col-md-2">
            <span className={loadingClassName} />
            &nbsp;
            {loading ? 'Loading...' : 'RESET'}
          </button>
        </form>
      </div>
    </div>
  );
};

const MapStateToProps = ({ user }) => ({
  user,
});

export { resetPassword };
export default connect(MapStateToProps, { resetPasswordAction })(resetPassword);

resetPassword.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
