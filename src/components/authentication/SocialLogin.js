import React from 'react';
import PropTypes from 'prop-types';
import googlesvg from '../../assets/google.svg';
import facebookSvg from '../../assets/facebook.svg';
import '../../scss/socialLogin.scss';

const SocialLogin = ({ name }) => (
  <a className="social-login-link" href={`${process.env.BACKEND_LINK}/api/v1/auth/${name}`}>
    <img src={name === 'google' ? googlesvg : facebookSvg} alt={name === 'google' ? 'google' : 'facebook'} />
  </a>
);

SocialLogin.propTypes = {
  name: PropTypes.oneOf(['facebook', 'google']).isRequired,
};
export default SocialLogin;
