/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Form, Col, Button, Image, Row,
} from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { loginAction } from '../../redux/actions/login';
import BackgroundImage from '../../assets/backg.jpg';
import fbImage from '../../assets/f.png';
import gogleImage from '../../assets/g.png';
import ErrorAlert from '../sharedComponents/Alert';
import NavBarComponent from '../sharedComponents/NavbarComponent';
import Footer from '../sharedComponents/Footer';
import '../../scss/login.scss';
import translate from '../languages/Translate';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      invalidEmailFeedback: '',
      emailIsValid: false,
      passwordIsValid: false,
      disableBtn: true,
      visible: false,
      errorMessage: '',
      textColor: '',
      removeHover: 'removeHover',
    };
  }

  handleEmail =(evt) => {
    this.setState({ emailIsValid: false, removeHover: 'removeHover' });
    this.setState({ email: evt.target.value });
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidation = emailRegex.test(evt.target.value);
    const { passwordIsValid } = this.state;
    if (!emailValidation) {
      return this.setState({ invalidEmailFeedback: translate('Email must be valid'), disableBtn: true });
    }
    this.setState({ invalidEmailFeedback: '' });
    this.setState({ emailIsValid: true });
    if (passwordIsValid) {
      return this.setState({ disableBtn: false, removeHover: '' });
    }
  }

  handlePassword =(evt) => {
    const { emailIsValid, passwordIsValid } = this.state;
    this.setState({ passwordIsValid: false, removeHover: 'removeHover' });
    this.setState({ password: evt.target.value });
    const passwordRegex = /^((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30})$/;
    const passValidation = passwordRegex.test(evt.target.value);
    if (!passValidation) {
      return this.setState({ disableBtn: true });
    }
    this.setState({ passwordIsValid: true });
    this.setState({ disableBtn: false });
    if (emailIsValid && passwordIsValid) {
      return this.setState({ disableBtn: false, removeHover: '' });
    }
  }

   handleSubmit = async (event) => {
     event.preventDefault();
     const { email, password } = this.state;
     this.setState({ loading: true, disableBtn: true });
     const actionResposnse = await this.props.loginAction({ email, password });
     if (actionResposnse.payload.status === 401) {
       this.setState({ loading: false });
       return this.setState({ visible: true, errorMessage: 'Wrong email or password. Please Enter valid credential', textColor: 'danger' });
     }
     if (!actionResposnse.payload.isVerified) {
       this.setState({ loading: false });
       this.setState({ email: '', password: '' });
       return this.setState({ visible: true, errorMessage: 'Welcome! Verify your account first.', textColor: 'dark' });
     }
     this.props.history.push('/dashoard');
   }

   render() {
     const {
       loading, emailIsValid, invalidEmailFeedback, disableBtn, errorMessage, visible, textColor, removeHover,
     } = this.state;
     const { intl } = this.props;
     const LOGIN = translate('LOGIN');
     const pleaseWait = translate('Please wait...');
     return (
       <>
         <NavBarComponent />
         <div className="signup-page">
           <Container fluid>
             <Row>
               <Col xs="12" sm="12" md="12" lg="7">
                 <Image className="image" src={BackgroundImage} />
                 <div className="welcome-text">{translate('Welcome to Barefoot Nomad')}</div>
               </Col>
               <Col xs="12" sm="12" md="12" lg="4">
                 <Form validated={false} onSubmit={this.handleSubmit} className="login">
                   <Form.Label>
                     <ErrorAlert message={errorMessage} visible={visible} textColor={textColor} className="validation-error" />
                     <h2 className="login-title">
                       { translate('LOGIN') }
                     </h2>
                   </Form.Label>
                   <Form.Group controlId="validationCustom03" className="login-form">
                     <Form.Group>
                       <div className="text-danger validation-error"><small>{ emailIsValid ? '' : invalidEmailFeedback }</small></div>
                       <Form.Control
                         type="email"
                         value={this.state.email}
                         placeholder="Email"
                         onChange={(e) => this.handleEmail(e)}
                         className="login_field testInput"
                         required
                       />
                     </Form.Group>
                     <Form.Group>
                       <Form.Control
                         className="login_field testInput1"
                         type="password"
                         value={this.state.password}
                         placeholder={intl.formatMessage({ id: 'Password', values: 'Password' })}
                         onChange={(e) => this.handlePassword(e)}
                         required
                       />
                     </Form.Group>
                   </Form.Group>
                   <Button type="submit" className={`${removeHover} login_btn`} disabled={disableBtn}>
                     {
                      loading ? pleaseWait : LOGIN
                    }
                   </Button>
                   <div className="lower-part">
                     <Form.Label>
                       <p className="forget-password">{translate('Forgot password?')}</p>
                       <p className="social-login orUse">{translate('Or Use')}</p>
                       <Image className="social-login logo1" src={gogleImage} />
                       <Image className="social-login" src={fbImage} />
                     </Form.Label>
                   </div>
                 </Form>
               </Col>
             </Row>
           </Container>
         </div>
         <Footer />
       </>
     );
   }
}
const MapStateToProps = ({ user }) => ({
  user,
});
export { Login };
export default injectIntl(connect(MapStateToProps, { loginAction })(Login));

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  push: PropTypes.func,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object,
};
