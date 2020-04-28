import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_SUCCESS } from '../actions/actionTypes';

const initialState = {
  userEmail: null,
  error: null,
  isPasswordForgotten: false
//   isLoading: false
};

const forgotPaswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state, userEmail: action.payload, isPasswordForgotten: true,
      };
    case FORGOT_PASSWORD_ERROR :
      return {
        ...state, error: action.payload,
      };
    default:
      return state;
  }
};

export default forgotPaswordReducer;
