import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../sharedComponents/Alert';
import '../../scss/password.scss';
import { forgotPasswordAction } from '../../redux/actions/forgotPassword';

const forgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [textColor, setTextColor] = useState('');
  const [loadingClassName, setLoadingClassName] = useState('spinner-border-sm');
  const [validationClassName, SetValidation] = useState('form-check text-center');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingClassName('spinner-border spinner-border-sm');
    const output = await props.forgotPasswordAction(email);
    if (output.payload.status === 200) {
      setErrorMessage(output.payload.data.message);
    }
    if (output.type === 'FORGOT_PASSWORD_ERROR') {
      setErrorMessage(output.payload.data.error);
    }
    setLoading(false);
    setLoadingClassName('spinner-border-sm');
    setVisible(true);
    setTextColor('danger');
  };
  const handleChange = async (e) => {
    setEmail(e.target.value);
    setVisible(false);
    SetValidation('was-validated form-check text-center');
  };
  return (
    <div className="content">
      <div className="container p-5 justify-content-md-center">
        <form onSubmit={handleSubmit} className={validationClassName}>
          <div className="form-group justify-content-center align-items-center">
            <h1> Forgot your password </h1>
            <Alert message={errorMessage} visible={visible} textColor={textColor} otherClassName="center col-md-4" />
            <input
              type="email"
              className="form-control text-center center col-md-4"
              placeholder="Enter email"
              value={email}
              name="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback text-lg-center">
              Enter a valid email
            </div>
          </div>
          <button type="submit" className="send-mail btn btn-primary col-md-2">
            <span className={loadingClassName} />
            {loading ? 'Loading...' : 'Send email'}
          </button>
        </form>
      </div>
    </div>
  );
};

const MapStateToProps = ({ user }) => ({
  user,
});

export { forgotPassword };
export default connect(MapStateToProps, { forgotPasswordAction })(forgotPassword);

forgotPassword.propTypes = {
  forgotPasswordAction: PropTypes.func.isRequired,
};
