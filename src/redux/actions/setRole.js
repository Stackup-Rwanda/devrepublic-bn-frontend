import axios from 'axios';
import { SET_ROLE_SUCCESS, SET_ROLE_ERROR } from './actionsTypes';

export const setRoleAction = (email, role) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.patch(`${process.env.BACKEND_LINK}/api/v1/users/setRoles`, { email, role }, { headers: { token } });
    return dispatch({ type: SET_ROLE_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: SET_ROLE_ERROR, payload: error.response });
  }
};
