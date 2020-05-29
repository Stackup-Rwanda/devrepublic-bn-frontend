import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../scss/newRequest.scss';
import { createOnewayAction } from '../../../redux/actions/createRequests';
import { getRequestsAction } from '../../../redux/actions/getRequests';
import Reusable from './ReUsable';
import Buttons from './Buttons';
import { handleActionOutput, handleUserInfo } from './sharedFunc';
import translate from '../../languages/Translate';

class OnewayTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      locationError: '',
      destination: '',
      destinationError: '',
      reasonError: '',
      reason: '',
      departureDateError: '',
      departureDate: '',
      textColor: '',
      sucessMessage: '',
      isdepartureDateValid: false,
      isLocationValid: false,
      isdestinationValid: false,
      isReasonValid: false,
      spinner: false,
      disabled: true,
    };
  }

  async componentDidMount() {
    handleUserInfo(this, this.props.userProfile.firstName, this.props.userProfile.gender, this.props.userProfile.role);
  }

  handleCreate = async () => {
    this.setState({
      spinner: true, disabled: true, location: '', reason: '', departureDate: '',
    });
    const {
      location, destination, reason, departureDate,
    } = this.state;
    const data = {
      location, destination, reason, departureDate, passportName: this.props.userProfile.firstName, gender: this.props.userProfile.gender, role: this.props.userProfile.role,
    };
    const actionOutput = await this.props.createOnewayAction(data);
    handleActionOutput(this, actionOutput);
    await this.props.getRequestsAction(localStorage.getItem('token'));
    this.props.hanldeCancel();
  }

  handleDisablesBtn = () => {
    const {
      isdepartureDateValid, isReasonValid, isdestinationValid, isLocationValid,
    } = this.state;
    if (isdepartureDateValid && isReasonValid && isdestinationValid && isLocationValid) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const {
      location, locationError, destinationError, isLocationValid, isdestinationValid,
      destination, isReasonValid, reasonError,
      reason, isdepartureDateValid, departureDateError, departureDate,
      textColor, spinner, disabled,
      sucessMessage,
    } = this.state;

    return (
      <>
        <div>
          <div className="trip-title">
            { translate('New trip request') }
            <span className="trip-type">{ translate('One way') }</span>
            <div className={`alert-message ${textColor}`}>
              <p>{sucessMessage}</p>
            </div>
          </div>
          <Reusable
            location={location}
            locationError={locationError}
            destinationError={destinationError}
            isLocationValid={isLocationValid}
            isdestinationValid={isdestinationValid}
            destination={destination}
            isReasonValid={isReasonValid}
            reasonError={reasonError}
            reason={reason}
            isdepartureDateValid={isdepartureDateValid}
            departureDateError={departureDateError}
            departureDate={departureDate}
            thisValue={this}
          />
          <Buttons
            spinner={spinner}
            handleCreate={this.handleCreate}
            hanldeCancel={this.props.hanldeCancel}
            disabled={disabled}
          />
        </div>
      </>
    );
  }
}

const MapStateToProps = ({ newRequest, requests, user }) => ({
  newRequest,
  requests,
  token: user.user.data,
});
export { OnewayTrip };
export default connect(MapStateToProps, { createOnewayAction, getRequestsAction })(OnewayTrip);
OnewayTrip.propTypes = {
  gender: PropTypes.string,
  role: PropTypes.string,
  userProfile: PropTypes.object,
  hanldeCancel: PropTypes.func,
  createOnewayAction: PropTypes.func,
  getRequestsAction: PropTypes.func,
};
