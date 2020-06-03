/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from './actionsTypes';


export const signupAction = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/auth/register`, user);
    return dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: SIGNUP_ERROR, payload: error.response.data });
  }
};
