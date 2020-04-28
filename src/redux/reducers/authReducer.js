// import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_SENT } from '../actions/actionTypes';

// const initialState = {
//   user: null,
//   error: null,
//   isPasswordReset: false,
//   isLoading: false
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case RESET_PASSWORD_SUCCESS:
//       return {
//         ...state, user: action.payload, isPasswordReset: true,
//       };
//     case RESET_PASSWORD_ERROR:
//       return {
//         ...state, error: action.payload,
//       };
//     case RESET_PASSWORD_SENT:
//       return {
//         ...state, user: action.payload, isLoading: true
//       }
//     default:
//       return state;
//   }
// };

// export default authReducer;
