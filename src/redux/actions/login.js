/* eslint-disable consistent-return */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_ERROR, LOGIN_SUCCESS } from './actionsTypes';


export const loginAction = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/auth/login`, user);
    const { data } = res.data;
    const { isVerified } = jwtDecode(data);
    if (isVerified) {
      localStorage.setItem('token', data);
    }
    return dispatch({ type: LOGIN_SUCCESS, payload: { data, isVerified } });
  } catch (error) {
    return dispatch({ type: LOGIN_ERROR, payload: error.response.data });
  }
};
