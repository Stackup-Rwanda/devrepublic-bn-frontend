import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MainPanel from '../sharedComponents/MainPanel';

const MainHeader = ({ filter, allTrips }) => (
  <Col className="requester-Dashboard">
    <div className="request-dashboard-title ">
      <MainPanel allTrips={allTrips} filter={filter} />
    </div>
  </Col>
);

MainHeader.propTypes = {
  filter: PropTypes.func,
  allTrips: PropTypes.array,
};

export default MainHeader;
