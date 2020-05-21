import axios from 'axios';
import { RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from './actionsTypes';

export const resetPasswordAction = (userPassword, token) => async (dispatch) => {
  try {
    const res = await axios.put('https://devrepublic-bn-backend.herokuapp.com/api/v1/auth/password/reset',
      { password: userPassword },
      { headers: { token } });
    return dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res });
  } catch (error) {
    return dispatch({ type: RESET_PASSWORD_ERROR, payload: error.response });
  }
};
