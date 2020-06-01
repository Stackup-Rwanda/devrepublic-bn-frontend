/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../../scss/chat.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import SideBar from '../sharedComponents/Sidebar';
import AuthNavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import translate from '../languages/Translate';
import placeholder from '../../assets/users.png';
import OverviewIcon from '../../assets/overview.svg';
import UsersIcon from '../../assets/users.svg';
import FacilitiesIcon from '../../assets/facilities.svg';
import TripsIcon from '../../assets/tripsIcon.svg';
import ChatIcon from '../../assets/chatIcon.svg';
import sendButton from '../../assets/sendIcon.svg';
import smileySelector from '../../assets/smiley.svg';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: [],
      chatHistory: [],
      textMessage: '',
    };
    this.socket = io(`${process.env.BACKEND_LINK}`, {
      query: { token: props.token || localStorage.getItem('token') },
    });
  }

  componentDidMount() {
    this.socket.on('onlineUsers', this.setOnlineUsers);
    this.socket.on('chatHistory', this.chatHistory);
    this.socket.on('newMessage', this.newChatHistory);
  }

  componentDidUpdate() {
    const body = document.querySelector('.chat .body');
    body.scrollTop = body.scrollHeight;
  }

  chatHistory = (data) => {
    this.setState({ chatHistory: JSON.parse(data) });
  }

  newChatHistory = (data) => {
    this.setState((prevState) => {
      const newChatHistory = [...prevState.chatHistory];
      newChatHistory.push(JSON.parse(data));
      return { chatHistory: newChatHistory };
    });
  }

  setOnlineUsers = (data) => {
    if (JSON.parse(data)) {
      this.setState({ onlineUsers: JSON.parse(data) });
    }
  }

  onEmojiClick = (event, chosenEmoji) => {
    const { textMessage } = this.state;
    this.setState({ textMessage: textMessage.concat(chosenEmoji.emoji) });
  }

  handleChangeMessage = (e) => {
    this.setState({ textMessage: e.target.value });
  };

  sendMessage = () => {
    const { textMessage } = this.state;
    const token = localStorage.getItem('token');
    if (textMessage !== '') {
      this.socket.emit('message', { message: textMessage, token });
    }
    this.setState({ textMessage: '' });
  }

  render() {
    const { onlineUsers, textMessage, chatHistory } = this.state;
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    return (
      <>
        <AuthNavBar />
        <Container fluid="lg">
          <SideBar>
            <div className="nav-item">
              <Link to="/Overview">
                <img src={OverviewIcon} alt="" className="overview" />
                <span>{translate('Overview')}</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/dashboard">
                <img src={UsersIcon} alt="" className="overview" />
                <span>{translate('Users')}</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/facilities">
                <img src={FacilitiesIcon} alt="" className="overview" />
                <span>{translate('Facilities')}</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/dashboard">
                <img src={TripsIcon} alt="" className="overview" />
                <span>{translate('Trips')}</span>
              </Link>
            </div>
            <div className="nav-item same-page">
              <Link to="/chat">
                <img src={ChatIcon} alt="" className="overview" />
                <span>{translate('Chat')}</span>
              </Link>
            </div>
          </SideBar>
          <div className="chat-container">
            <div className="online-users">
              {onlineUsers.map((user) => (
                <div className="user online">
                  <img src={user.image || placeholder} alt="profile" className="profile-image" />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
              ))}
            </div>
            <div className="chat">
              <div className="messages">
                <div className="title">
                  <p className="chat-title">Chat</p>
                  <p className="online-users-number">
                    {onlineUsers.length}
                    {' '}
                    users online
                  </p>
                </div>
              </div>
              <div className="body">
                {chatHistory.map((item) => (
                  <div className={`new-message ${decoded.id === item.userId && 'owner'}`}>
                    <div className="chatting-user">
                      <img src={item.image || placeholder} className="profile-image" alt="" />
                      <p>{item.userName}</p>
                    </div>
                    <div className="message">
                      <p>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="typing">
                <div className="input-group">
                  <input type="text" className="form-control" onChange={this.handleChangeMessage} value={textMessage} placeholder="Type a message here" />
                  <div className="input-group-append">
                    <span className="input-group-text smiley-span" onClick={this.enableEmoji} id="basic-addon1">
                      <img src={smileySelector} alt="" className="smiley selector" />
                    </span>
                    <Picker onEmojiClick={this.onEmojiClick} disableAutoFocus skinTone={SKIN_TONE_NEUTRAL} />
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text" onClick={this.sendMessage} id="basic-addon1"><img src={sendButton} alt="" className="send-text" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

Chat.propTypes = {
  token: PropTypes.string,
};

export default Chat;
