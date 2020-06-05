import axios from 'axios';
import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_SUCCESS } from './actionsTypes';

export const forgotPasswordAction = (userEmail) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.BACKEND_LINK}/api/v1/auth/password/forgot`, {
      email: userEmail,
    });
    return dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res });
  } catch (error) {
    return dispatch({ type: FORGOT_PASSWORD_ERROR, payload: error.response });
  }
};
