import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import NavBar from '../sharedComponents/AuthNavBar';
import '../../scss/usersTable.scss';
import noUserImage from '../../assets/users.png';
import Footer from '../sharedComponents/Footer';
import { getUsersAction } from '../../redux/actions/viewUsers';
import SideBar from '../sharedComponents/Sidebar';
import { PopUp } from '../popUp';
import { setRoleAction } from '../../redux/actions/setRole';
import translate from '../languages/Translate';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: ['manager', 'travel team member', 'requester', 'travel administrator', 'supplier', 'super administrator'],
      popUp: 'invisible',
      popUpActiveItem: {},
    };
  }

  async componentDidMount() {
    const actionOutput = await this.props.getUsersAction();
    this.setState({ users: actionOutput.payload.data });
  }

  handleSetRolePopUp = async (visibility, activeItem) => {
    await this.setState({ popUp: visibility, popUpActiveItem: activeItem });
  }

  updateUsers = (users) => {
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <Container className="admin-dashboard" fluid="lg">
          <NavBar />
          <PopUp
            roles={this.state.roles}
            isPopUpActive={this.state.popUp}
            users={this.state.users}
            updateUsers={this.updateUsers}
            handleVisibility={this.handleSetRolePopUp}
            setRoleAction={this.props.setRoleAction}
            activeItem={this.state.popUpActiveItem}
          />
          <Row className="super-admin-dashboard-view">
            <Col lg="2" sm="1" xs="1" md="2">
              <SideBar>
                <div className="nav-item same-page">
                  <Link to="/Overview">{translate('Overview')}</Link>
                </div>
                <div className="nav-item">
                  <Link to="/dashboard">
                    {translate('Users')}
                  </Link>
                </div>
                <div className="nav-item same-page">
                  <Link to="/facilities">
                    {translate('Facilities')}
                  </Link>
                </div>
                <div className="nav-item same-page">
                  <Link to="/dashboard">
                    {translate('Trips')}
                  </Link>
                </div>
              </SideBar>
            </Col>
            <Col lg="10" sm="11" md="9" xs="11" className="col-1">

              <Row>
                <Col className="user-Dashboard">
                  <div className="user-dashboard-title ">
                    {translate('Super Admin Dashboard')}
                  </div>
                  <div className="all-users-title">
                    {translate('All Users')}
                  </div>
                </Col>
              </Row>
              <div className="table-header">
                <Table>
                  <tr className="col-titles">
                    <th>{translate('Users')}</th>
                    <th>{translate('Role')}</th>
                    <th>{translate('Manager')}</th>
                    <th>{translate('Date Joined')}</th>
                    <th>+</th>
                  </tr>
                  {users.map((user) => (
                    <tbody key={user.id}>
                      <tr className="row-info-container">
                        <td className="col-accomodation">
                          <span>
                            <img className="profile-image" src={user.image || noUserImage} alt="profile" />
                          </span>
                          <span className="firstName">{user.firstName}</span>
                          <span className="lastName">{user.lastName}</span>

                        </td>
                        <td className="role selectable">
                          <span className="trip-details-reason">
                            {' '}
                            {' '}
                            {translate(user.role)}
                            {' '}
                          </span>
                        </td>
                        <td className="col-departure-date">
                          <span className="trip-details-reason">
                            {' '}
                            {user.managerName}
                          </span>
                          <br />
                        </td>
                        <td className="col-departure-date">
                          <span className="trip-details-reason">
                            {' '}
                            {user.createdAt.split('T')[0]}
                          </span>
                          <br />
                          {' '}
                          {user.createdAt.split('T')[1].split('.')[0]}
                        </td>
                        <td className="col-departure-date">
                          <Dropdown>
                            <Dropdown.Toggle variant="none" />
                            <Dropdown.Menu>
                              <Dropdown.Item className="assign-manager-drop">{translate('ASSIGN A MANAGER')}</Dropdown.Item>
                              <Dropdown.Item className="set-role-drop" onClick={() => this.handleSetRolePopUp('visible', user)}>{translate('SET ROLE')}</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </div>
              <Row />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const MapStateToProps = ({ users }) => ({
  users,
});
export { AdminDashboard };
export default injectIntl(connect(MapStateToProps, { getUsersAction, setRoleAction })(AdminDashboard));

AdminDashboard.propTypes = {
  getUsersAction: PropTypes.func.isRequired,
  setRoleAction: PropTypes.func.isRequired,
};
