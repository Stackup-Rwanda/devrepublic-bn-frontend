import React, { Component, createRef } from 'react';
import
{
  Container, Row, Col, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import SideBar from '../sharedComponents/Sidebar';
import axiosOption from '../../util/axiosOption';
import translate from '../languages/Translate';
import Item from './FacilityItem';
import { getRequestsAction } from '../../redux/actions/getRequests';
import { getUserInfo } from '../../redux/actions/userActions';
import { getFacilities } from '../../redux/actions/facilityActions';
import '../../scss/facilities.scss';

class Facilities extends Component {
  constructor(props) {
    const today = new Date();
    const todayDate = today.toISOString().substr(0, 10);
    super(props);
    this.state = {
      show: false,
      facilityId: null,
      facilityName: null,
      rooms: [],
      roomId: '',
      checkin: todayDate,
      checkout: todayDate,
      location: null,
    };
    this.bookErrorRef = createRef();
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.props.dispatch(getUserInfo(token));
    await this.props.dispatch(getRequestsAction(token));
    await this.props.dispatch(getFacilities(token));
  }

setPopupValue = (data) => {
  this.setState({
    show: true, facilityId: data.id, rooms: data.rooms, facilityName: data.facilityName, location: data.location,
  });
}

handleChange = (event) => {
  const { value, name } = event.target;
  this.setState({ [name]: value });
}

resetBooking = () => {
  const today = new Date();
  const todayDate = today.toISOString().substr(0, 10);
  this.setState({
    facilityId: null, rooms: [], show: false, roomId: '', checkin: todayDate, checkout: todayDate, facilityName: null,
  });
}

handleBooking = async (event) => {
  const {
    roomId, facilityId, checkin, checkout, facilityName, location,
  } = this.state;
  event.preventDefault();
  if (!roomId) {
    this.bookErrorRef.current.style.display = 'block';
    return setTimeout(() => { this.bookErrorRef.current.style.display = 'none'; }, 2000);
  }
  const request = this.props.requests.find((el) => el.destination === location);
  if (!request) {
    return toast.error('please create a request to this destination before booking', {
      autoClose: 9000,
      position: 'top-right',
    });
  }
  try {
    await axios.post(`${process.env.BACKEND_LINK}/api/v1/facilities/book`, {
      facilityId, roomId, checkin, checkout, facilityName, requestId: request.id,
    }, axiosOption(localStorage.getItem('token')));
    await this.props.dispatch(getFacilities(localStorage.getItem('token')));
    this.resetBooking();
    return toast.info(`a booking to ${facilityName} has been created`, {
      autoClose: 9000,
      position: 'top-right',
    });
  } catch (error) {
    return toast.error(error.response.data.error, {
      autoClose: 9000,
      position: 'top-right',
    });
  }
}

likeUnlikeFacility = async (id, type) => {
  const token = localStorage.getItem('token');
  try {
    await axios.patch(`${process.env.BACKEND_LINK}/api/v1/facilities/${type}?id=${id}`, {}, axiosOption(token));
    await this.props.dispatch(getFacilities(token));
  } catch (error) {
    toast.error('unable to like or unlike the facility', {
      autoClose: 9000,
      position: 'top-right',
    });
  }
}

render() {
  const {
    show, rooms, roomId, checkin, checkout,
  } = this.state;
  const { intl, role, id } = this.props;
  const facilities = this.props.facilities.map((el) => (<Item key={el.id} facility={el} setValue={this.setPopupValue} role={role} userId={id} show={show} likeUnlikeFacility={this.likeUnlikeFacility} />));
  const roomAvailable = rooms.filter((el) => el.availability);
  const roomOption = roomAvailable.map((el) => (
    <option key={el.id} value={el.id}>
      {el.roomName}
      {' '}
      {el.type}
    </option>
  ));
  const today = new Date();
  const todayDate = today.toISOString().substr(0, 10);
  return (
    <>
      <SideBar>
        <div className="nav-item">
          <Link to="/profile">{translate('Profile')}</Link>
        </div>
        <div className="nav-item">
          <Link to="/dashboard">
            {translate('Travel Requests')}
          </Link>
        </div>
        <div className="nav-item same-page">
          <Link to="/facilities">
            {translate('Facilities')}
          </Link>
        </div>
      </SideBar>
      <NavBar />
      <Container className="facility-container">
        <Row>
          <Col className="facilities-title">{translate('Facilities available')}</Col>
        </Row>
        <Row className="facility-card-row">
          {facilities}
        </Row>
        <form style={{ display: show ? 'block' : 'none' }} className="book-popup shadow p-3 mb-5 bg-white rounded">
          <div className="book-error" ref={this.bookErrorRef}>{translate('please choose a room first')}</div>
          <div className="rooms">
            <span>{translate('available rooms')}</span>
            <select name="roomId" defaultValue={roomId} onChange={this.handleChange}>
              <option disabled value="">{intl.formatMessage({ id: 'available rooms', value: 'available rooms' })}</option>
              {roomOption}
            </select>
          </div>
          <div className="checkin">
            <span>{translate('Checkin')}</span>
            <input type="date" min={todayDate} value={checkin} name="checkin" onChange={this.handleChange} />
          </div>
          <div className="checkout">
            <span>{translate('Checkout')}</span>
            <input type="date" min={todayDate} value={checkout} name="checkout" onChange={this.handleChange} />
          </div>
          <div className="book-button">
            <Button
              className="cancel-booking"
              onClick={this.resetBooking}
            >
              {translate('Cancel')}
            </Button>
            <Button className="booking-button" onClick={this.handleBooking}>{translate('Book')}</Button>
          </div>
        </form>
      </Container>
      <Footer />
    </>

  );
}
}

Facilities.propTypes = {
  facilities: PropTypes.array,
  dispatch: PropTypes.func,
  requests: PropTypes.array,
  intl: PropTypes.object,
  role: PropTypes.string,
  id: PropTypes.string,
};

const mapStateToProps = ({ facilities, requests, profile }) => ({
  facilities: facilities.facilities,
  facilityServerError: facilities.error,
  requests: requests.requests,
  role: profile.role,
  id: profile.id,
});

export default injectIntl(connect(mapStateToProps)(Facilities));
