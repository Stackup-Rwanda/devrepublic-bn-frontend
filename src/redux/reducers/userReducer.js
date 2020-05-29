import {
  GET_USER_INFO, PROFILE_FETCH_ERROR,
  SET_PROFILE_IMAGE,
  SET_EMAIL_NOTIFICATION,
  SET_PROFILE_IMAGE_ERROR,
  SET_EMAIL_NOTIFICATION_ERROR,
} from '../actions/actions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  language: '',
  role: '',
  currency: '',
  residence: '',
  birthdate: '',
  image: '',
  profileFetchError: '',
  fetchImageError: '',
  setEmailNotifError: '',
  id: '',
  emailNotifications: null,
  isVerified: null,
  department: '',
  gender: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...state, ...action.payload };
    case PROFILE_FETCH_ERROR:
      return { ...state, profileFetchError: action.payload };
    case SET_PROFILE_IMAGE:
      return { ...state, image: action.payload };
    case SET_PROFILE_IMAGE_ERROR:
      return { ...state, fetchImageError: action.payload };
    case SET_EMAIL_NOTIFICATION:
      return { ...state, emailNotifications: action.payload };
    case SET_EMAIL_NOTIFICATION_ERROR:
      return { ...state, setEmailNotifError: action.payload };
    default:
      return state;
  }
};

export default userReducer;
