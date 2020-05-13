import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './sharedComponents/AuthNavBar';

const Dashboard = ({ token, image }) => (<NavBar token={token} image={image} />);

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  token: user.token || localStorage.getItem('token'),
  image: '',
});

export default connect(mapStateToProps)(Dashboard);
