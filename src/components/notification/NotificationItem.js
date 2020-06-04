import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../scss/notification.scss';

const NotificationItem = ({
  id, status, content, createdAt, requestId,
}) => (
  <div className="notification-item row" key={id}>
    <div className="col-2">
      <span className="read-notif" style={(status !== 'unread') ? { backgroundColor: 'white' } : null} />
    </div>
    <div className="notif-message col-7"><Link to={`/request/${requestId}`}>{content}</Link></div>
    <div className="date-notif col-3">{`${createdAt.substring(5, 7)}/${createdAt.substring(8, 10)}`}</div>
  </div>
);
NotificationItem.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
};

export default NotificationItem;
