/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import '../../scss/requestTable.scss';
import AuthNavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import { getRequestsAction } from '../../redux/actions/getRequests';
import { getUserInfo } from '../../redux/actions/userActions';
import {
  requestDates, checkStatus, columnTitles, reasonColumnTitle, spinnner, dashboardSidebar,
}
  from './sharedFuncs';
import translate from '../languages/Translate';
import pagination from '../../util/pagination';
import MainHeader from './MainHeader';
import TripTypeModal from './createRequest/TripTypeModal';

class RequesterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      displayedRequests: [],
      bookings: [],
      loading: true,
      oneWayTrip: 'One way trip',
      returnTrip: 'Return trip',
      multicityTrip: 'Multicity trip',
      tripType: '',
      firstName: '',
      lastName: '',
      role: '',
      gender: '',
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    const actionOutput = await this.props.getRequestsAction(token);
    await this.props.getUserInfo(token);
    this.setState({
      requests: actionOutput.payload.data.requests,
      bookings: actionOutput.payload.data.bookings,
      loading: false,
      disable: false,
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      role: this.props.profile.role,
      gender: this.props.profile.gender,
    });
    this.setState((prevState) => ({ displayedRequests: pagination(prevState.requests, 1) }));
  }

  async componentWillReceiveProps(nextProps) {
    this.setState(() => ({ requests: nextProps.requests.requests }));
  }

  findAccommodation = (request, booking) => {
    switch (request.id) {
      case `${booking.requestId}`:
        return (
          <p className="ml-1">{booking.facilityName}</p>
        );
      default:
        return (
          <p className="tex-center ml-5">-</p>
        );
    }
  }


  filter = (newArray) => {
    this.setState({
      displayedRequests: newArray,
    });
  }

  hanldeCancel = () => {
    this.setState({ show: false });
  }

  hanldeSelectedTrip = (event) => {
    const {
      oneWayTrip, returnTrip, multicityTrip,
    } = this.state;
    this.setState({ show: true });
    switch (event.target.value) {
      case oneWayTrip:
        return this.setState({ tripType: oneWayTrip });
      case returnTrip:
        return this.setState({ tripType: returnTrip });
      case multicityTrip:
        return this.setState({ tripType: multicityTrip });
      default:
        return null;
    }
  };

  render() {
    const {
      requests, bookings, loading, displayedRequests,
      show, oneWayTrip, returnTrip, multicityTrip, tripType, disable,
      firstName,
      lastName,
      role,
      gender,
    } = this.state;
    const requestsLength = requests.length;
    const Accommodation = 'Accommodation';
    const tripDetails = 'Trip Details';
    const date = 'Date';
    const Status = 'Status';
    return (
      <>
        <AuthNavBar />
        <div>
          <Container className="whole-conatainer" fluid>
            <Row>
              <Col lg="2" sm="1" xs="1" md="2">
                {dashboardSidebar()}
              </Col>
              <TripTypeModal
                tripType={tripType}
                userProfile={{
                  firstName, lastName, role, gender,
                }}
                show={show}
                disable={disable}
                hanldeCancel={this.hanldeCancel}
              />
              <Col lg="10" sm="11" md="9" xs="11" className="col-1">

                <Row>
                  <Col sm="12" md="4" lg="4">
                    <Col className="requester-Dashboard">
                      <div className="request-dashboard-title ">
                        { translate('Requester Dashboard') }
                      </div>
                      <MainHeader allTrips={requests} filter={this.filter} />
                    </Col>
                    <div className="btn-container ml-5">
                      <DropdownButton className="newRequest" title={translate('New Request')} variant="inherit">
                        <Dropdown.Item onClick={this.hanldeSelectedTrip} value={oneWayTrip} className="trip-item" as="button">{translate('One way trip')}</Dropdown.Item>
                        <Dropdown.Item onClick={this.hanldeSelectedTrip} className="trip-item" as="button" value={returnTrip}>{translate('Return trip')}</Dropdown.Item>
                        <Dropdown.Item onClick={this.hanldeSelectedTrip} className="trip-item" as="button" value={multicityTrip}>{translate('Multicity trip')}</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Col>
                </Row>
                {
                  loading ? (
                    <>
                      {spinnner()}
                    </>
                  ) : ''
                }
                {
                            requestsLength === 0 && !loading ? (
                              <div className="no-requests mt-2">
                                {translate('No request found. Create a request!')}
                              </div>
                            ) : (
                              <div className="dashboard-content">
                                <Table>
                                  {columnTitles(tripDetails, Accommodation, date, Status)}
                                  {displayedRequests.map((request) => (
                                    <tbody key={request.id} className="table-header">
                                      <tr className="row-info-container">
                                        {reasonColumnTitle(request)}
                                        <td className="col-accomodation">
                                          {
                              bookings.map((booking) => (
                                this.findAccommodation(request, booking)
                              ))
                            }
                                        </td>
                                        { requestDates(request)}
                                        <td className="text-center col-status">
                                          { checkStatus(request) }
                                        </td>
                                      </tr>
                                    </tbody>

                                  ))}
                                </Table>
                              </div>
                            )
                }
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

const MapStateToProps = ({ requests, profile }) => ({
  requests,
  profile,
});
export { RequesterDashboard };
export default connect(MapStateToProps, { getRequestsAction, getUserInfo })(RequesterDashboard);

RequesterDashboard.propTypes = {
  getRequestsAction: PropTypes.func,
  getUserInfo: PropTypes.func,
  token: PropTypes.string,
  profile: PropTypes.object,
  requests: PropTypes.object,
};
