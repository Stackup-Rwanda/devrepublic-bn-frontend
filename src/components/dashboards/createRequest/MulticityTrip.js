/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { MdAddBox, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import '../../../scss/newRequest.scss';
import { createMultiCityTripAction } from '../../../redux/actions/createRequests';
import Reusable from './ReUsable';
import Buttons from './Buttons';
import {
  handleActionOutput, handleUserInfo,
} from './sharedFunc';
import translate from '../../languages/Translate';


class MulticityTrip extends Component {
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
      stopsArray: [],
      stopLocation: '',
      stopReason: '',
      stopArrivalDate: '',
      stopDepartureDate: '',
      isStopLocationValid: false,
      isStopReasonValid: false,
      isStopArrivalDateValid: false,
      isStopDepartureDateValid: false,
      stopLocationError: '',
      stopReasonError: '',
      stopArrivalDateError: '',
      stopDepartureDateError: '',
    };
  }

  async componentDidMount() {
    handleUserInfo(this, this.props.userProfile.firstName, this.props.userProfile.gender, this.props.userProfile.role);
  }

  handleCreate = async () => {
    this.setState({ spinner: true, disabled: true });
    const {
      location, destination, reason, departureDate, returnDate, stopLocation,
      stopReason,
      stopArrivalDate,
      stopDepartureDate,
    } = this.state;
    const data = {
      location,
      destination,
      reason,
      departureDate,
      passportName: this.props.userProfile.firstName,
      gender: this.props.userProfile.gender,
      role: this.props.userProfile.role,
      returnDate,
      stops: [{
        stopName: stopLocation, reason: stopReason, stopArrivalDate, stopDepartureDate,
      }],
    };
    const actionOutput = await this.props.createMultiCityTripAction(data);
    handleActionOutput(this, actionOutput);
    this.setState({ spinner: false, disabled: true });
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

  handleStopLocationInputs = (event) => {
    const inputValue = event.target.value;
    const { stopLocationError } = this.state;
    this.setState({
      stopLocation: inputValue,
    });
    const validationError = validator.isEmpty(inputValue);
    if (validationError) {
      this.setState({ stopLocationError: 'Stop Location is required', disabled: true });
    } else {
      this.setState({ isStopLocationValid: true, stopLocationError: '' });
      this.handleDisablesBtn();
    }
  };

  handleStopArrivalDateInputs = (event) => {
    const inputValue = event.target.value;
    const { isStopArrivalDateValid, departureDate } = this.state;
    this.setState({
      stopArrivalDate: inputValue, stopArrivalDateError: isStopArrivalDateValid ? '' : 'Enter a valid arrival date',
    });
    const validationError = validator.isAfter(event.target.value, departureDate);
    if (!validationError) {
      this.setState({ isStopArrivalDateValid: false, stopArrivalDateError: 'Enter a arrival date', disabled: true });
    } else {
      this.setState({ isStopArrivalDateValid: true, stopArrivalDateError: '' });
      this.handleDisablesBtn();
    }
  };

  handleStopDepartureDateInputs = (event) => {
    const inputValue = event.target.value;
    const { isStopDepartureDateValid, stopArrivalDate } = this.state;
    this.setState({
      stopDepartureDate: inputValue, stopDepartureDateError: isStopDepartureDateValid ? '' : 'Enter a valid stop departure date',
    });
    const validationError = validator.isAfter(event.target.value, stopArrivalDate);
    if (!validationError) {
      this.setState({ isStopDepartureDateValid: false, stopDepartureDateError: 'Enter a valid stop departure date', disabled: true });
    } else {
      this.setState({ isStopDepartureDateValid: true, stopDepartureDateError: '' });
      this.handleDisablesBtn();
    }
  };

  handleStopReasonInputs = (event) => {
    const inputValue = event.target.value;
    const { isStopReasonValid } = this.state;
    this.setState({
      stopReason: inputValue, stopReasonError: isStopReasonValid ? '' : 'At least 10 characters',
    });
    const validationError = validator.isLength(inputValue, { min: 10, max: 250 });
    if (!validationError) {
      this.setState({ isStopReasonValid: false, disabled: true });
    } else {
      this.setState({ isStopReasonValid: true, stopReasonError: '' });
      this.handleDisablesBtn();
    }
  };

    hanldeAddStops = () => {
      const {
        stopsArray,
        stopLocationError, stopReasonError, stopArrivalDateError, stopDepartureDateError,
      } = this.state;
      stopsArray.push(
        <div key={Math.random() * 5}>
          <>
            <div>
              <div className="trip-content">
                <div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <label className="stop-label">Stop Location:</label>
                        <input type="text" onChange={(event) => this.handleStopLocationInputs(event)} className="form-control" />
                        <p className="text-danger error-message">{stopLocationError}</p>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <label className="stop-label">Stop Reason:</label>
                      <textarea className="form-control" onChange={(event) => this.handleStopReasonInputs(event)} rows="3" />
                      <p className="text-danger error-message">{stopReasonError}</p>
                      <label className="stop-label">Stop Arrival Date:</label>
                      <input type="date" onChange={(event) => this.handleStopArrivalDateInputs(event)} className="form-control stop-departure" />
                      <p className="text-danger error-message">{stopArrivalDateError}</p>
                      <label className="stop-label">Stop Departure Date:</label>
                      <input type="date" onChange={(event) => this.handleStopDepartureDateInputs(event)} className="form-control stop-departure" />
                      <p className="text-danger error-message">{stopDepartureDateError}</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        </div>,
      );
      this.setState({ stopsArray: [...stopsArray] });
    }

handleRemoveStops = (value) => {
  const { stopsArray } = this.state;
  const newArry = stopsArray.filter((stop) => stop.key !== value);
  this.setState({ stopsArray: newArry });
}


render() {
  const {
    returnDate,
    stopsArray, departureDate,
    spinner, disabled, location, returnDateError, textColor, sucessMessage, locationError, destinationError,
    isLocationValid, isdestinationValid, destination, isReasonValid, reasonError, reason, isdepartureDateValid, departureDateError,
  } = this.state;

  return (
    <>
      <div>
        <div className="trip-title">
          { translate('New trip request') }
          <span className="trip-type">{ translate('Multicity') }</span>
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
              <label className="label">{ translate('Retrun Date:') }</label>
              <input type="date" value={returnDate} min={departureDate} onChange={this.handleReturnDate} className="form-control" placeholder="Departure Date" />
              <p className="text-danger error-message">{returnDateError}</p>
            </div>
          </div>
        </form>
        <div>
          <div className="add-stops text-center" role="button" onClick={this.hanldeAddStops}>
            <p className="d-inline width">{ translate('ADD STOPS') }</p>
            <MdAddBox size="1.5em" className="d-inline" />
          </div>

          {stopsArray.map((value) => (
            <div key={value.key}>
              <span className="mt-1 stopNo">
                <p className="d-inline">{ translate('Remove') }</p>
                <MdDelete className="d-inline" size="1.6em" onClick={() => this.handleRemoveStops(value.key)} />
              </span>
              <>
                {value}
              </>
            </div>
          ))}
        </div>
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
export { MulticityTrip };
export default connect(MapStateToProps, { createMultiCityTripAction })(MulticityTrip);
MulticityTrip.propTypes = {
  userProfile: PropTypes.object,
  gender: PropTypes.string,
  role: PropTypes.string,
  hanldeCancel: PropTypes.func,
  createMultiCityTripAction: PropTypes.func,
};
