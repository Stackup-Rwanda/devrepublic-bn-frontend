import React, { Component } from 'react';
import PropTypes from 'prop-types';
import translate from './languages/Translate';
import '../scss/popUp.scss';
import Alert from './sharedComponents/Alert';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: this.props.roles,
      email: '',
      role: this.props.activeItem.role,
      errorMessage: '',
      alertVisible: false,
      textColor: '',
    };
  }

  async componentDidMount() {
    await this.setState({ email: '', role: '' });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      activeItem, isPopUpActive, roles,
    } = nextProps;
    if (activeItem) {
      const email = activeItem.email || '';
      if (nextProps.activeItem.email !== prevState.email) {
        return {
          roles, isPopUpActive, email, role: activeItem.role,
        };
      }
    }
    return null;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, role } = this.state;
    const response = await this.props.setRoleAction(email, role);
    if (response.payload.status === 200) {
      const users = this.props.users.filter((user) => {
        const returnedUser = user;
        returnedUser.role = returnedUser.email === email ? role : user.role;
        return returnedUser;
      });

      this.props.updateUsers(users);
      this.setState({ alertVisible: false });
      return this.props.handleVisibility('invisible');
    }
    return this.setState({ alertVisible: true, errorMessage: response.payload.data.error.toString(), textColor: 'dark' });
  }

  handleRoleChange = (selected) => {
    const { value } = selected.target;
    this.setState({ role: value });
  }

  render() {
    const title = 'Set Role';
    const cancelButton = translate('Cancel');
    const submitButton = translate('Assign');
    const {
      errorMessage, alertVisible, textColor,
    } = this.state;
    const { activeItem } = this.props;
    return (
      <>
        <div className={`pop-up-container ${this.props.isPopUpActive}`}>
          <div>
            <span className="set-role title">{title}</span>
          </div>
          <br />
          <Alert message={errorMessage} visible={alertVisible} textColor={textColor} otherClassName="pop-up-center" />
          <div className="form-inline">
            <span className="email-text mb-2 mr-sm-5">{translate('User')}</span>
            <h5>
              { activeItem
              && `${activeItem.firstName}  ${activeItem.lastName}`}
            </h5>
          </div>
          <br />
          <div className="form-inline">
            <span className="role-text mb-2 mr-sm-5">{translate('Role')}</span>
            <select
              className="role-field selectpicker show-tick form-control mb-2"
              onChange={this.handleRoleChange}
              name="role"
              placeholder="select user role"
            >
              {this.state.roles.map((role) => {
                const selected = activeItem
                  && role === activeItem.role ? 'selected' : ''
                  || '';
                return (
                  <option value={role} selected={selected}>
                    {role}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button type="button" onClick={() => this.props.handleVisibility('invisible')} className="cancel-pop-up btn btn-danger mb-2 mr-sm-5">{cancelButton}</button>
            <button type="submit" onClick={this.handleSubmit} className="submit-pop-up btn btn-primary mb-2">{submitButton}</button>
          </div>
        </div>
      </>
    );
  }
}

export { PopUp };

PopUp.propTypes = {
  users: PropTypes.array,
  roles: PropTypes.array,
  isPopUpActive: PropTypes.string,
  setRoleAction: PropTypes.func.isRequired,
  handleVisibility: PropTypes.func.isRequired,
  activeItem: PropTypes.object,
  updateUsers: PropTypes.func.isRequired,
};
