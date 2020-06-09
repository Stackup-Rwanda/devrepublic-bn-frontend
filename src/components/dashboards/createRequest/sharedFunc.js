/* eslint-disable consistent-return */
import validator from 'validator';

export const validInputs = (isdepartureDateValid, isReasonValid, isdestinationValid, isLocationValid) => ({
  isdepartureDateValid, isReasonValid, isdestinationValid, isLocationValid,
});


export const handleDepartureDate = (thisValue, event) => {
  const inputValue = event.target.value;
  const { isdepartureDateValid } = thisValue.state;
  thisValue.setState({
    departureDate: inputValue, departureDateError: isdepartureDateValid ? '' : 'Enter a valid departure date',
  });
  const validationError = validator.isAfter(event.target.value);
  if (!validationError) {
    thisValue.setState({ isdepartureDateValid: false, departureDateError: 'Enter a valid departure date', disabled: true });
  } else {
    thisValue.setState({ isdepartureDateValid: true, departureDateError: '' });
    thisValue.handleDisablesBtn();
  }
};
export const handleReasonInputs = (thisValue, event) => {
  const inputValue = event.target.value;
  const { isReasonValid } = thisValue.state;
  thisValue.setState({
    reason: inputValue, reasonError: isReasonValid ? '' : 'At least 10 characters',
  });
  const validationError = validator.isLength(inputValue, { min: 10, max: 250 });
  if (!validationError) {
    thisValue.setState({ isReasonValid: false, disabled: true });
  } else {
    thisValue.setState({ isReasonValid: true, reasonError: '' });
    thisValue.handleDisablesBtn();
  }
};

export const handleDestinationInputs = (thisValue, event) => {
  const inputValue = event.target.value;

  thisValue.setState({
    destination: inputValue,
  });
  const validationError = validator.isEmpty(inputValue, { ignore_whitespace: true });
  if (validationError) {
    thisValue.setState({ destinationError: 'Destination is required', disabled: true });
  } else {
    thisValue.setState({ isdestinationValid: true, destinationError: '' });
    thisValue.handleDisablesBtn();
  }
};
export const handleLocationInputs = (thisValue, event) => {
  const inputValue = event.target.value;
  thisValue.setState({
    location: inputValue,
  });
  const validationError = validator.isEmpty(inputValue);
  if (validationError) {
    thisValue.setState({ locationError: 'Location is required', disabled: true });
  } else {
    thisValue.setState({ isLocationValid: true, locationError: '' });
    thisValue.handleDisablesBtn();
  }
};
export const handleUserInfo = (thisValue, firstName, gender, role) => {
  if (!firstName || !gender || !role) {
    const textColor = 'error-color';
    return thisValue.setState({ sucessMessage: 'Update your profile first', textColor });
  }
};

export const handleActionOutput = async (thisValue, actionOutput) => {
  if (actionOutput.payload.status === 201) {
    const textColor = 'success-color';
    return thisValue.setState({ sucessMessage: 'New request created successfully!', textColor });
  }
  if (actionOutput.payload.status === 409) {
    const textColor = 'error-color';
    return thisValue.setState({ sucessMessage: 'Request already exist', textColor });
  }
  if (actionOutput.payload.status === 500) {
    const textColor = 'error-color';
    return thisValue.setState({ sucessMessage: 'Oops! Server error', textColor });
  }
  if (actionOutput.payload.error === 'Please enter valid return date according to your stops and actual departure date') {
    const textColor = 'error-color';
    return thisValue.setState({ sucessMessage: 'Enter valid stop departure and return date', textColor });
  }
  if (actionOutput.payload.error === 'user should have manager before performing this operation') {
    const textColor = 'error-color';
    return thisValue.setState({ sucessMessage: 'You have no manager yet', textColor });
  }
};
