import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import '../../../scss/newRequest.scss';
import { createReturnTripAction } from '../../../redux/actions/createRequests';
import Reusable from './ReUsable';
import Buttons from './Buttons';
import { handleActionOutput, handleUserInfo } from './sharedFunc';
import translate from '../../languages/Translate';

class ReturnTrip extends Component {
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
      returnDate: '',
      returnDateError: '',
      isReturnDateValid: '',
      isLocationValid: false,
      isdestinationValid: false,
      isReasonValid: false,
      isdepartureDateValid: false,
      spinner: false,
      disabled: true,
    };
  }

  async componentDidMount() {
    handleUserInfo(this, this.props.userProfile.firstName, this.props.userProfile.gender, this.props.userProfile.role);
  }

  handleCreate = async () => {
    this.setState({ spinner: true, disabled: true });
    const {
      location, destination, reason, departureDate, returnDate,
    } = this.state;
    const data = {
      location, destination, reason, departureDate, returnDate, passportName: this.props.userProfile.firstName, gender: this.props.userProfile.gender, role: this.props.userProfile.role,
    };
    const actionOutput = await this.props.createReturnTripAction(data);
    handleActionOutput(this, actionOutput);
    this.setState({
      spinner: false, disabled: true, location: '', reason: '', departureDate: '', returnDate: '',
    });
  }

  handleReturnDate = (event) => {
    const inputValue = event.target.value;
    const { departureDate, isReturnDateValid } = this.state;
    this.setState({
      returnDate: inputValue, returnDateError: isReturnDateValid ? '' : 'Enter a valid return date according to departure date',
    });
    const validation = validator.isAfter(inputValue, departureDate);
    if (!validation) {
      this.setState({ isReturnDateValid: false, disabled: true });
    } else {
      this.setState({ isReturnDateValid: true, returnDateError: '' });
    }
    this.handleDisablesBtn();
  };

  handleDisablesBtn = () => {
    const {
      isdepartureDateValid, isReasonValid, isdestinationValid, isLocationValid, isReturnDateValid,
    } = this.state;
    if (isdepartureDateValid && isReasonValid && isdestinationValid && isLocationValid && isReturnDateValid) {
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
      sucessMessage, returnDate, returnDateError,
    } = this.state;

    return (
      <>
        <div>
          <div className="trip-title">
            { translate('New trip request') }
            <span className="trip-type">{translate('Return') }</span>
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
          <form>
            <div className="row">
              <div className="col">
                <label className="label">{translate('Retrun Date:') }</label>
                <input type="date" min={departureDate} value={returnDate} onChange={this.handleReturnDate} className="form-control" placeholder="Departure Date" />
                <p className="text-danger error-message">{returnDateError}</p>
              </div>
            </div>
          </form>
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

const MapStateToProps = ({ newRequest }) => ({
  newRequest,
});
export { ReturnTrip };
export default connect(MapStateToProps, { createReturnTripAction })(ReturnTrip);
ReturnTrip.propTypes = {
  userProfile: PropTypes.object,
  gender: PropTypes.string,
  role: PropTypes.string,
  hanldeCancel: PropTypes.func,
  createReturnTripAction: PropTypes.func,
};
