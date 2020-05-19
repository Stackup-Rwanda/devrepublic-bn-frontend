import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import '../../scss/requestTable.scss';
import AuthNavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import { getRequestsAction } from '../../redux/actions/getRequests';
import {
  checkStatus, requestDates, columnTitles, reasonColumnTitle, spinnner, dashboardSidebar,
} from './sharedFuncs';
import NewAndSearch from './NewAndSearch';
import placeholder from '../../assets/users.png';
import translate from '../languages/Translate';
import pagination from '../../util/pagination';
import MainHeader from './MainHeader';


class ManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      displayedRequests: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    const actionOutput = await this.props.getRequestsAction(token);
    this.setState({
      requests: actionOutput.payload.data.requests,
      loading: false,
    });
    this.setState((prevState) => ({ displayedRequests: pagination(prevState.requests, 1) }));
  }

  filter = (newArray) => {
    this.setState({
      displayedRequests: newArray,
    });
  }

  render() {
    const { requests, loading, displayedRequests } = this.state;
    const requestsLength = requests.length;
    const Requester = 'Requester';
    const tripDetails = 'Trip Details';
    const date = 'Date';
    const Status = 'Status';

    return (
      <>
        <AuthNavBar />
        <div>
          <Container className="whole-conatainer" fluid>
            <Row className="bg-dange dashboard-view">
              <Col lg="2" sm="1" xs="1" md="2">
                {dashboardSidebar()}

              </Col>
              <Col lg="10" sm="11" md="9" xs="11" className="col-1">

                <Row>
                  <MainHeader allTrips={requests} filter={this.filter} />
                  <Col className="all-icons text-center">
                    <NewAndSearch />
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
                                                  {translate('No request created by your direct reports yet!')}
                                                </div>
                                              ) : (
                                                <div className="table-header">
                                                  <Table>
                                                    {columnTitles(Requester, tripDetails, date, Status)}
                                                    {displayedRequests.map((request) => (
                                                      <tbody key={request.id}>
                                                        <tr className="row-info-container">
                                                          <td className="col-accomodation">
                                                            <span>
                                                              <img className="profile-image" src={request.User.image || placeholder} alt="profile" />
                                                            </span>
                                                            <span className="firstName">{request.User.firstName}</span>
                                                            <span className="lastName">{request.User.lastName}</span>

                                                          </td>
                                                          {reasonColumnTitle(request)}

                                                          {requestDates(request)}
                                                          <td className="text-center col-status">
                                                            {checkStatus(request)}
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
export { ManagerDashboard };
export default connect(MapStateToProps, { getRequestsAction })(ManagerDashboard);

ManagerDashboard.propTypes = {
  getRequestsAction: PropTypes.func,
  token: PropTypes.string,
};
