import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Alert from '../sharedComponents/Alert';
import NavBarComponent from '../sharedComponents/NavbarComponent';
import Footer from '../sharedComponents/Footer';
import { resetPasswordAction } from '../../redux/actions/resetPassword';
import '../../scss/password.scss';
import translate from '../languages/Translate';

const resetPassword = (props) => {
  const token = props.location.search.split('token=')[1];
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [textColor, setTextColor] = useState('');
  const [validationClassName, SetValidation] = useState('form-check text-center');
  const [loadingClassName, setLoadingClassName] = useState('spinner-border-sm');
  const { intl } = props;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingClassName('spinner-border spinner-border-sm');
    const output = await props.resetPasswordAction(password, token);
    if (output.payload.status === 200) {
      setErrorMessage(translate(output.payload.data.message));
      props.history.push('/dashboard');
    } else {
      setErrorMessage(translate(output.payload.data.error));
      setTextColor('danger');
    }
    setLoading(false);
    setLoadingClassName('spinner-border-sm');
    setVisible(true);
  };
  const handleChange = async (e) => {
    setPassword(e.target.value);
    setVisible(false);
    SetValidation('was-validated form-check text-center');
  };
  return (
    <>
      <NavBarComponent />
      <Container fluid="lg">
        <div className="content">
          <div className="container password-container p-5 justify-content-md-center">
            <form
              className={validationClassName}
              onSubmit={handleSubmit}
            >
              <div className="form-group justify-content-center align-items-center">
                <h1>
                  { translate('Reset your password') }
                </h1>
                <Alert message={errorMessage} visible={visible} textColor={textColor} otherClassName="center col-md-4" />
                <input
                  type="password"
                  className="form-control text-center center col-md-4"
                  pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}"
                  placeholder={intl.formatMessage({ id: 'New Password', values: 'New Password' })}
                  value={password}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback text-lg-center">
                  { translate('Use a password of at least 8 characters: uppercase, lowercase letters, numbers and special characters') }
                </div>
              </div>
              <button type="submit" className="btn btn-primary col-md-2">
                <span className={loadingClassName} />
            &nbsp;
                {loading ? translate('Loading...') : translate('RESET')}
              </button>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

const MapStateToProps = ({ user }) => ({
  user,
});

export { resetPassword };
export default injectIntl(connect(MapStateToProps, { resetPasswordAction })(resetPassword));

resetPassword.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object,
};
