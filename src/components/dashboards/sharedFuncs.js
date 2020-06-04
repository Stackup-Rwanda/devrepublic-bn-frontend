import React from 'react';
import { Link } from 'react-router-dom';
import translate from '../languages/Translate';
import SideBar from '../sharedComponents/Sidebar';

export const checkStatus = (request) => {
  switch (request.status) {
    case 'rejected':
      return (
        <p className="rejectedStatus">{translate(`${request.status}`)}</p>
      );
    case 'open':
      return (
        <p className="openStatus">{translate(`${request.status}`)}</p>
      );
    case 'approved':
      return (
        <p className="approvedStatus">{translate(`${request.status}`)}</p>
      );
    default:
      return request.status;
  }
};

export const columnTitles = (col1, col2, col3, col4) => (
  <tr className="col-titles">
    <th>{translate(`${col1}`)}</th>
    <th>{translate(`${col2}`)}</th>
    <th>{translate(`${col3}`)}</th>
    <th>{translate(`${col4}`)}</th>
  </tr>
);
export const reasonColumnTitle = (request) => (
  <td className="selectable">
    <span className="trip-details-reason">{translate('Reason:')}</span>
    <br />
    {request.reason}
    <br />
    <span className="trip-details-reason">{translate('Type:')}</span>
    {request.type}
  </td>
);

export const spinnner = () => (
  <>
    <div className="text-center ">
      <div className="spinner-border spinner-border-lg spinner-loading" role="status" />
    </div>
    <div className="text-center loadingText">{translate('Loading...')}</div>
  </>
);
export const dashboardSidebar = () => (
  <>
    <SideBar>
      <div className="nav-item">
        <Link to="/profile">{translate('Profile')}</Link>
      </div>
      <div className="nav-item same-page">
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
  </>
);
export const requestDates = (request) => (
  <>
    <td className="col-departure-date">
      <span className="trip-details-reason">{translate('Departure:')}</span>
      {' '}
      {request.departureDate}
      <br />
      <span className="trip-details-reason">Return:</span>
      {' '}
      {request.returnDate}
    </td>
  </>
);
