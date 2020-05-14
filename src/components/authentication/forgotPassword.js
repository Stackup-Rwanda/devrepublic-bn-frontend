import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Alert from '../sharedComponents/Alert';
import '../../scss/password.scss';
import NavBarComponent from '../sharedComponents/NavbarComponent';
import Footer from '../sharedComponents/Footer';
import { forgotPasswordAction } from '../../redux/actions/forgotPassword';
import translate from '../languages/Translate';

const forgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [textColor, setTextColor] = useState('');
  const [loadingClassName, setLoadingClassName] = useState('spinner-border-sm');
  const [validationClassName, SetValidation] = useState('form-check text-center');
  const { intl } = props;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingClassName('spinner-border spinner-border-sm');
    const output = await props.forgotPasswordAction(email);
    if (output.payload.status === 200) {
      setErrorMessage(translate(output.payload.data.message));
      setTextColor('success');
    } else {
      setErrorMessage(translate(output.payload.data.error));
      setTextColor('danger');
    }
    setLoading(false);
    setLoadingClassName('spinner-border-sm');
    setVisible(true);
  };
  const handleChange = async (e) => {
    setEmail(e.target.value);
    setVisible(false);
    SetValidation('was-validated form-check text-center');
  };
  return (
    <>
      <NavBarComponent />
      <Container fluid="lg">
        <div className="content">
          <div className="container p-5 justify-content-md-center">
            <form onSubmit={handleSubmit} className={validationClassName}>
              <div className="form-group justify-content-center align-items-center">
                <h1>
                  {translate('Forgot your password')}
                </h1>
                <Alert message={errorMessage} visible={visible} textColor={textColor} otherClassName="center col-md-4" />
                <input
                  type="email"
                  className="form-control text-center center col-md-4"
                  placeholder={intl.formatMessage({ id: 'Enter email', values: 'Enter email' })}
                  value={email}
                  name="email"
                  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback text-lg-center">
                  { translate('Enter a valid email') }
                </div>
              </div>
              <button type="submit" className="send-mail btn btn-primary col-md-2">
                <span className={loadingClassName} />
                {loading ? translate('Loading...') : translate('Send email')}
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

export { forgotPassword };
export default injectIntl(connect(MapStateToProps, { forgotPasswordAction })(forgotPassword));

forgotPassword.propTypes = {
  forgotPasswordAction: PropTypes.func.isRequired,
  intl: PropTypes.object,
};
