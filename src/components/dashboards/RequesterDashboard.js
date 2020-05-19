import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import '../../scss/requestTable.scss';
import AuthNavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import NewAndSearch from './NewAndSearch';
import { getRequestsAction } from '../../redux/actions/getRequests';
import {
  requestDates, checkStatus, columnTitles, reasonColumnTitle, spinnner, dashboardSidebar,
}
  from './sharedFuncs';
import translate from '../languages/Translate';
import pagination from '../../util/pagination';
import MainHeader from './MainHeader';

class RequesterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      displayedRequests: [],
      bookings: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    const actionOutput = await this.props.getRequestsAction(token);
    this.setState({
      requests: actionOutput.payload.data.requests,
      bookings: actionOutput.payload.data.bookings,
      loading: false,
    });
    this.setState((prevState) => ({ displayedRequests: pagination(prevState.requests, 1) }));
  }

  findAccommodation = (request, booking) => {
    switch (request.id) {
      case `${booking.requestId}`:
        return (
          <p className="ml-1 bg-danger">{booking.facilityName}</p>
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

  render() {
    const {
      requests, bookings, loading, displayedRequests,
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
              <Col lg="10" sm="11" md="9" xs="11" className="col-1">

                <Row>
                  <MainHeader allTrips={requests} filter={this.filter} />
                  <Col sm="12" md="4" lg="4">
                    <div className="all-icons text-center">
                      <NewAndSearch />
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
                <Row />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

const MapStateToProps = ({ requests }) => ({
  requests,
});
export { RequesterDashboard };
export default connect(MapStateToProps, { getRequestsAction })(RequesterDashboard);

RequesterDashboard.propTypes = {
  getRequestsAction: PropTypes.func,
  token: PropTypes.string,
};