/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container, Form, Col, Button, Image, Row,
} from 'react-bootstrap';
import translate from '../languages/Translate';
import { signupAction } from '../../redux/actions/signupAction';
import '../../scss/signup.scss';
import NavBarComponent from '../sharedComponents/NavbarComponent';
import Footer from '../sharedComponents/Footer';
import BackgroundImage from '../../assets/backg.jpg';
import FormItem from './FormItem';
import SocialLogin from './SocialLogin';


export const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLogin] = useState(false);
  const [loading, setloading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    e.target.placeholder === 'First Name' ? setFirstName(e.target.value)
      : e.target.placeholder === 'Last Name' ? setLastName(e.target.value)
        : e.target.placeholder === 'Email' ? setEmail(e.target.value) : null;
  };

  // eslint-disable-next-line consistent-return
  const handlePassword = (e) => {
    setPassword(e.target.value);

    const passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{7,30}/;
    const validatePassword = passwordRegex.test(password);

    if (!validatePassword) {
      setValidPassword(true);
      const feedbackMessage = 'Your password must contain atleast 8 character, including a capital letter and a symbol.';
      return setFeedback(feedbackMessage);
    }

    setFeedback('');
    setValidPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName, lastName, email, password,
    };
    setLogin(!isLoggedIn);
    setloading(true);
    const output = await props.signupAction(data);

    if (output.payload.status === 201) {
      props.history.push('/');
    } else {
      setloading(false);
      const errors = typeof output.payload.error === 'object' ? output.payload.error : [output.payload.error];

      errors.map((e) => toast.error(e, {
        autoClose: 9000,
        position: 'top-right',
      }));
    }
  };

  return (
    <div className="signup-page">
      <NavBarComponent />
      <Container fluid>
        <Row>
          <Col xs="12" sm="12" md="12" lg="8">
            <Image className="image" src={BackgroundImage} />
            <div className="text">Welcome to Barefoot Nomad</div>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            <Form onSubmit={handleSubmit} className="signup-form">
              <Form.Label>
                <h2>
                  {translate('Create an Account')}
                </h2>
              </Form.Label>
              <Form.Row>
                <FormItem
                  Col={Col}
                  type="text"
                  defaultValue={firstName}
                  placeholder="First Name"
                  setValue={handleChange}
                />
                <FormItem
                  Col={Col}
                  type="text"
                  defaultValue={lastName}
                  placeholder="Last Name"
                  setValue={handleChange}
                />
              </Form.Row>
              <Form.Group>
                <FormItem
                  type="email"
                  defaultValue={email}
                  placeholder="Email"
                  setValue={handleChange}
                />
                <FormItem
                  type="password"
                  defaultValue={password}
                  placeholder="Password"
                  setValue={(e) => handlePassword(e)}
                />
                {validPassword ? <div className="feedback-message">{feedback}</div> : null}
              </Form.Group>
              <Button type="submit" className="signup-form_btn">
                {
                  loading ? 'Please wait...' : 'REGISTER'
                }
              </Button>
              <Form.Row className="social-login-signup">
                <div>
                  <p>{translate('Or Use')}</p>
                </div>

                <div className="social-links-signup">
                  <SocialLogin name="google" />
                  <SocialLogin name="facebook" />
                </div>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

const MapStateToProps = ({ user }) => ({
  user,
});

export default connect(MapStateToProps, { signupAction })(Signup);
