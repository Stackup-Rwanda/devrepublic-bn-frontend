import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../scss/newRequest.scss';
import {
  handleDepartureDate, handleReasonInputs, handleDestinationInputs, handleLocationInputs,
} from './sharedFunc';
import translate from '../../languages/Translate';


class Reusable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      location, locationError, destinationError,
      destination, reasonError,
      reason, departureDateError, departureDate, thisValue,
    } = this.props;
    return (
      <>
        <div>
          <div className="trip-content">
            <div>
              <form>
                <div className="row">
                  <div className="col">
                    <label>{ translate('Location') }</label>
                    <input type="text" defaultValue={location} onChange={(event) => handleLocationInputs(thisValue, event)} className="form-control" />
                    <p className="text-danger error-message">{locationError}</p>

                  </div>
                  <div className="col">
                    <label>{ translate('Destination') }</label>
                    <input type="text" defaultValue={destination} onChange={(event) => handleDestinationInputs(thisValue, event)} className="form-control" rows="3" />
                    <p className="text-danger error-message">{destinationError}</p>

                  </div>
                </div>
                <div className="form-group mt-1">
                  <label>{translate('Trip Reason') }</label>
                  <textarea defaultValue={reason} onChange={(event) => handleReasonInputs(thisValue, event)} className="form-control" rows="3" required />
                  <p className="text-danger error-message">{reasonError}</p>
                </div>
                <div className="row">
                  <div className="col">
                    <label>{translate('Departure Date') }</label>
                    <input type="date" defaultValue={departureDate} onChange={(event) => handleDepartureDate(thisValue, event)} className="form-control" required />
                    <p className="text-danger error-message">{departureDateError}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Reusable;

Reusable.propTypes = {
  location: PropTypes.string,
  locationError: PropTypes.string,
  destinationError: PropTypes.string,
  destination: PropTypes.string,
  reasonError: PropTypes.string,
  reason: PropTypes.string,
  departureDateError: PropTypes.string,
  departureDate: PropTypes.string,
  thisValue: PropTypes.instanceOf,
};
