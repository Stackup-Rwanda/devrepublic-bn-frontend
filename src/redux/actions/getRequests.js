import axios from 'axios';

import { GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILURE } from './actionsTypes';


export const getRequestsAction = (token) => async (dispatch) => {
  try {
    const res = await axios.get('https://devrepublic-bn-backend.herokuapp.com/api/v1/trips/view-accommodations-ratings', { headers: { token } });
    return dispatch({ type: GET_REQUESTS_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_REQUESTS_FAILURE, payload: error });
  }
};
