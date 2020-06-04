/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Container, Card, Col, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStatsAction } from '../../redux/actions/stats';
import SideBar from './Sidebar';
import NavBar from './AuthNavBar';
import Footer from './Footer';
import translate from '../languages/Translate';
import '../../scss/stats.scss';

class Stats extends Component {
  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.props.getStatsAction(token);
  }

  render() {
    const {
      totalTripsNumber,
      upCommingTrips,
      pastYears,
      statusStatistics,
    } = this.props.stats.stats;
    return (
      <>
        <SideBar>
          <div className="nav-item same-page">
            <Link to="/stats">
              {translate('Overview')}
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/profile">{translate('Profile')}</Link>
          </div>
          <div className="nav-item">
            <Link to="/dashboard">
              {translate('Travel Requests')}
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/facilities">
              {translate('Facilities')}
            </Link>
          </div>
        </SideBar>
        <NavBar />
        <Container>
          <div className="stats">
            <h2>{translate('Travel Statistics')}</h2>
            <Row>
              {
              [
                { title: translate('Total Trips'), number: totalTripsNumber },
                { title: translate('Upcoming Trips'), number: upCommingTrips },
                { title: translate('Past Years'), number: pastYears },
              ].map((heading) => (
                <Col xs="12" sm="12" md="12" lg="4">
                  <Card className="card">
                    <Card.Header>{heading.title}</Card.Header>
                    <Card.Body>
                      <Card.Title className="card_stat">{heading.number}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
            </Row>
            <br />
            <h2>{translate('Status Statistics')}</h2>
            <Row>
              {
              [
                { title: translate('Open Requests'), number: statusStatistics.openRequests },
                { title: translate('Approved Requests'), number: statusStatistics.approvedRequests },
                { title: translate('Rejected Requests'), number: statusStatistics.rejectedRequets },
              ].map((heading) => (
                <Col xs="12" sm="12" md="12" lg="4">
                  <Card className="status_card">
                    <Card.Header>{heading.title}</Card.Header>
                    <Card.Body>
                      <Card.Title className="status_card_stat">{heading.number}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
            </Row>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

const MapStateToProps = ({ stats }) => ({
  stats,
});

export default connect(MapStateToProps, { getStatsAction })(Stats);
