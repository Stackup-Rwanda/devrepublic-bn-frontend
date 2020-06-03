import axios from 'axios';
import axiosOptions from '../../util/axiosOption';
import {
  GET_USER_INFO,
  PROFILE_FETCH_ERROR,
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_ERROR,
  SET_EMAIL_NOTIFICATION,
  SET_EMAIL_NOTIFICATION_ERROR,
} from './actions';

export const setUserInfo = (data) => ({
  type: GET_USER_INFO,
  payload: data,
});

export const profileFetchError = (error) => ({
  type: PROFILE_FETCH_ERROR,
  payload: error,
});

export const setProfilePic = (image) => ({
  type: SET_PROFILE_IMAGE,
  payload: image,
});
export const setProfileImageError = (error) => ({
  type: SET_PROFILE_IMAGE_ERROR,
  payload: error,
});
export const setEmailNotification = (bool) => ({
  type: SET_EMAIL_NOTIFICATION,
  payload: bool,
});
export const setEmailNotificationError = (error) => ({
  type: SET_EMAIL_NOTIFICATION_ERROR,
  payload: error,
});
export const getUserInfo = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_LINK}/api/v1/users/view-profile`, axiosOptions(token));
    dispatch(setUserInfo(response.data.data));
  } catch (error) {
    dispatch(profileFetchError(error.response.data.error));
  }
};

export const setProfileImage = (token, image) => async (dispatch) => {
  const options = {
    headers: {
      token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formdata = new FormData();
  formdata.append('image', image);
  try {
    const response = await axios.post(`${process.env.BACKEND_LINK}/api/v1/users/edit-profile-image`, formdata, options);
    return dispatch(setProfilePic(response.data.data));
  } catch (error) {
    return dispatch(setProfileImageError(error.response.data.error));
  }
};

export const setEmailNotif = (token, bool) => async (dispatch) => {
  const url = `${process.env.BACKEND_LINK}/api/v1/notifications/email-opt-${bool ? 'in' : 'out'}`;
  try {
    await axios.patch(url, {}, axiosOptions(token));
    return dispatch(setEmailNotification(bool));
  } catch (error) {
    return dispatch(setEmailNotificationError(error.response.data.error));
  }
};

export const updateProfile = (token, user) => async (dispatch) => {
  try {
    await axios.patch(`${process.env.BACKEND_LINK}/api/v1/users/edit-profile`, user, axiosOptions(token));
    await dispatch(getUserInfo(token));
  } catch (error) {
    dispatch(profileFetchError(error.response.data.error));
  }
};
