import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import translate from '../languages/Translate';
import MainPanel from '../sharedComponents/MainPanel';

const MainHeader = ({ filter, allTrips }) => (
  <Col className="requester-Dashboard">
    <div className="request-dashboard-title ">
      {translate('Manager Dashboard')}
      <MainPanel allTrips={allTrips} filter={filter} />
    </div>
  </Col>
);

MainHeader.propTypes = {
  filter: PropTypes.func,
  allTrips: PropTypes.array,
};

export default MainHeader;
