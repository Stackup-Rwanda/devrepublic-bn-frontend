import { RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from '../actions/actionTypes';

const initialState = {
  userPassword: null,
  error: null,
  isPasswordReset: false
//   isLoading: false
};

const resetPaswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state, userPassword: action.payload, isPasswordReset: true,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state, error: action.payload,
      };
    default:
      return state;
  }
};

export default resetPaswordReducer;
