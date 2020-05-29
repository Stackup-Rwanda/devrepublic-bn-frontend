import axios from 'axios';

import { CREATE_REQUEST_FAILURE, CREATE_REQUEST_SUCCESS } from './actionsTypes';

const token = localStorage.getItem('token');

export const createOnewayAction = (requestData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/trips/one-way`, requestData, { headers: { token } });
    return dispatch({ type: CREATE_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: CREATE_REQUEST_FAILURE, payload: error.response.data });
  }
};
export const createReturnTripAction = (requestData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/trips/return`, requestData, { headers: { token } });
    return dispatch({ type: CREATE_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: CREATE_REQUEST_FAILURE, payload: error.response.data });
  }
};

export const createMultiCityTripAction = (requestData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/trips/multi-city`, requestData, { headers: { token } });
    return dispatch({ type: CREATE_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: CREATE_REQUEST_FAILURE, payload: error.response.data });
  }
};
