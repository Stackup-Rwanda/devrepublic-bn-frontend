/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';

const ApiCall = () => {
  const [message, setMessage] = useState('');
  const handleApiCall = async () => {
    const response = await axios.get('https://devrepublic-bn-backend.herokuapp.com/');
    setMessage(response.data);
  };
  return (
    <div>
      <button type="button" onClick={handleApiCall}>Click</button>
      <h3>{message.message}</h3>
    </div>
  );
};

export default ApiCall;
