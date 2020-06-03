import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import bell from '../../assets/notificationbell.png';
import '../../scss/notification.scss';
import NotificationItem from './NotificationItem';
import translate from '../languages/Translate';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showMore: false,
      notifications: [],
      error: false,
    };
    this.socket = io(process.env.BACKEND_LINK, {
      query: { token: props.token || localStorage.getItem('token') },
    });
    this.readAllNotif = this.readAllNotif.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.setNewNotif = this.setNewNotif.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    this.socket.on('initialize', this.setNotification);
    this.socket.on('notification', this.setNewNotif);
  }


  setNotification(data) {
    if (JSON.parse(data).notif) {
      this.setState({ notifications: JSON.parse(data).notif.reverse() });
    }
  }

  setNewNotif(data) {
    this.setState((prevState) => {
      const newState = [...prevState.notifications];
      newState.unshift(JSON.parse(data));
      return { notifications: newState };
    });
    toast.info(JSON.parse(data).content, {
      autoClose: 9000,
      position: 'top-right',
    });
  }


  setError() {
    this.setState({ error: false });
  }

  async readAllNotif() {
    try {
      const { token } = this.props;
      await axios.patch(`${process.env.BACKEND_LINK}/api/v1/notifications/all-read`, {}, { headers: { token: token || localStorage.getItem('token') } });
      return io(process.env.BACKEND_LINK, {
        query: { token: token || localStorage.getItem('token') },
      }).on('initialize', this.setNotification);
    } catch (error) {
      this.setState({ error: true });
      return setTimeout(this.setError, 2000);
    }
  }

  render() {
    const {
      notifications, error, show, showMore,
    } = this.state;
    const style = {
      height: '334px',
    };
    let allItem = [];
    if (notifications.length > 0) {
      allItem = notifications.map((el) => (
        <NotificationItem
          id={el.id}
          content={el.content}
          status={el.status}
          createdAt={el.createdAt}
          key={el.id}
        />
      ));
    }
    return (
      <div className="notification-wrapper">
        <button type="button" id="bell-button" onClick={() => this.setState((prev) => ({ show: !prev.show }))}>
          <img src={bell} alt="bell" className="notification-bell" />
          {notifications.some((d) => d.status === 'unread') ? <div className="new-notification"> </div> : null}
        </button>
        <div className="notif-panel container" style={{ display: show ? 'block' : 'none ', height: showMore ? '440px' : '280px' }}>
          <p>
            Notifications
            <span style={{ display: error ? 'block' : 'none' }}>{translate('all notification already seen')}</span>
          </p>
          <div className="notifications" style={showMore ? style : null}>
            {showMore ? allItem : allItem.slice(0, 3)}
          </div>
          <div className="row notif-buttons">
            <button type="button" className="col" id="mark-all" onClick={this.readAllNotif}>{translate('mark all as read')}</button>
            <button type="button" className="col" id="view-more" onClick={() => this.setState((prev) => ({ showMore: !prev.showMore }))}>{showMore ? translate('view less') : translate('view more')}</button>
          </div>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  token: PropTypes.string,
};

export default Notification;
