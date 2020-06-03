import axios from 'axios';
import { GET_USERS_SUCCESS, GET_USERS_ERROR } from './actionsTypes';

export const getUsersAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.BACKEND_LINK}/api/v1/users/view`, { headers: { token } });
    return dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_USERS_ERROR, payload: error.response });
  }
};
