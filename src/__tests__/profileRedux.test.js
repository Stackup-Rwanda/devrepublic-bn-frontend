/* eslint-disable prefer-promise-reject-errors */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  setUserInfo,
  profileFetchError,
  setProfilePic,
  setProfileImageError,
  setEmailNotification,
  setEmailNotificationError, getUserInfo, setProfileImage, setEmailNotif, updateProfile,
} from '../redux/actions/userActions';
import {
  GET_USER_INFO,
  PROFILE_FETCH_ERROR,
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_ERROR, SET_EMAIL_NOTIFICATION, SET_EMAIL_NOTIFICATION_ERROR,
} from '../redux/actions/actions';
import profileReducer from '../redux/reducers/userReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('profile redux actions', () => {
  it('setUserInfo should return a plain object', () => {
    const data = {
      firstName: 'user1',
      email: 'user@example.com',

    };
    const result = setUserInfo(data);
    expect(result.type).toBe(GET_USER_INFO);
    expect(result.payload).toEqual(data);
  });
  it('should return a object with a error "profileFetchError" ', () => {
    const result = profileFetchError('invalid token provided');
    expect(result.type).toBe(PROFILE_FETCH_ERROR);
    expect(result.payload).toBe('invalid token provided');
  });
  it('should return a object with an image url "setProfilePic" ', () => {
    const result = setProfilePic('www.cloudina.cm/dcms.png');
    expect(result.type).toBe(SET_PROFILE_IMAGE);
    expect(result.payload).toBe('www.cloudina.cm/dcms.png');
  });
  it('should return a object with an Error message "setProfileImageError" ', () => {
    const result = setProfileImageError('image not found');
    expect(result.type).toBe(SET_PROFILE_IMAGE_ERROR);
    expect(result.payload).toBe('image not found');
  });
  it('should return a object with a boolean value for emailnotfication "setEmailNotification" ', () => {
    const result = setEmailNotification(true);
    expect(result.type).toBe(SET_EMAIL_NOTIFICATION);
    expect(result.payload).toBe(true);
  });
  it('should return a object with an Error message "setEmailNotificationError" ', () => {
    const result = setEmailNotificationError('unauthorised');
    expect(result.type).toBe(SET_EMAIL_NOTIFICATION_ERROR);
    expect(result.payload).toBe('unauthorised');
  });
  describe('testing async "getUserInfo" action creator', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    });
    it('should dispatch an setUserInfo action', async () => {
      const result = { type: GET_USER_INFO, payload: { firstName: 'izzeddin' } };
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { firstName: 'izzeddin' } } }));

      await store.dispatch(getUserInfo('sffscasaasdfsa'));
      expect(store.getActions()).toEqual([result]);
    });
    it('should dispatch a get profile error action', async () => {
      const result = { type: PROFILE_FETCH_ERROR, payload: 'invalid token' };
      axios.get.mockImplementationOnce(() => Promise.reject({ response: { data: { error: 'invalid token' } } }));
      await store.dispatch(getUserInfo('sffscasaasdfsa'));
      expect(store.getActions()).toEqual([result]);
    });

    it('should dispatch a setProfileImage action', async () => {
      const result = { type: SET_PROFILE_IMAGE, payload: 'wwww.cloudia.cm/profile.png' };
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: 'wwww.cloudia.cm/profile.png' } }));
      await store.dispatch(setProfileImage('sffscasaasdfsa', { name: 'profile.png' }));
      expect(store.getActions()).toEqual([result]);
    });

    it('should dispatch a SET profile image error action', async () => {
      const result = { type: SET_PROFILE_IMAGE_ERROR, payload: 'unable to process image' };
      axios.post.mockImplementationOnce(() => Promise.reject({ response: { data: { error: 'unable to process image' } } }));
      await store.dispatch(setProfileImage('sffscasaasdfsa', { name: 'profile.png' }));
      expect(store.getActions()).toEqual([result]);
    });

    it('should dispatch a setEmailNotif action "optin"', async () => {
      const result = { type: SET_EMAIL_NOTIFICATION, payload: true };
      axios.patch.mockImplementationOnce(() => Promise.resolve({ data: true }));
      await store.dispatch(setEmailNotif('sffscasaasdfsa', true));
      expect(store.getActions()).toEqual([result]);
    });
    it('should dispatch a setEmailNotif action "optout"', async () => {
      const result = { type: SET_EMAIL_NOTIFICATION, payload: false };
      axios.patch.mockImplementationOnce(() => Promise.resolve({ data: false }));
      await store.dispatch(setEmailNotif('sffscasaasdfsa', false));
      expect(store.getActions()).toEqual([result]);
    });
    it('should dispatch a setEmailNotif error action', async () => {
      const result = { type: SET_EMAIL_NOTIFICATION_ERROR, payload: 'you are not allowed to performed this action' };
      axios.patch.mockImplementationOnce(() => Promise.reject({ response: { data: { error: 'you are not allowed to performed this action' } } }));
      await store.dispatch(setEmailNotif('sffscasaasdfsa', false));
      expect(store.getActions()).toEqual([result]);
    });
    it('should dispatch a updateInfo action', async () => {
      const result = { type: GET_USER_INFO, payload: { firstName: 'josh' } };
      axios.patch.mockImplementationOnce(() => Promise.resolve({ response: 'profile updated successfully' }));
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { firstName: 'josh' } } }));
      await store.dispatch(updateProfile('sffscasaasdfsa'));
      expect(store.getActions()).toEqual([result]);
    });
    it('should dispatch a updateInfo action', async () => {
      const result = { type: PROFILE_FETCH_ERROR, payload: 'profile already up to date' };
      axios.patch.mockImplementationOnce(() => Promise.reject({ response: { data: { error: 'profile already up to date' } } }));
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { firstName: 'josh' } } }));
      await store.dispatch(updateProfile('sffscasaasdfsa'));
      expect(store.getActions()).toEqual([result]);
    });
  });
});

describe('profile reducer', () => {
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
    gender: '',
    profileFetchError: '',
    fetchImageError: '',
    setEmailNotifError: '',
    id: '',
    emailNotifications: null,
    isVerified: null,
    department: '',
  };
  it('should return the initial reducer', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle the GET_USER_INFO action', () => {
    const result = profileReducer(initialState, { type: GET_USER_INFO, payload: { firstName: 'user', lastName: 'normal' } });
    expect(result).toEqual({ ...initialState, firstName: 'user', lastName: 'normal' });
  });

  it('should handle the PROFILE_FETCH_ERROR action', () => {
    const result = profileReducer(initialState, { type: PROFILE_FETCH_ERROR, payload: 'unable to retrieve' });
    expect(result.profileFetchError).toBe('unable to retrieve');
  });
  it('should handle the SET_PROFILE_IMAGE action', () => {
    const result = profileReducer(initialState, { type: SET_PROFILE_IMAGE, payload: 'www.cloundia.cm/profile.png' });
    expect(result.image).toBe('www.cloundia.cm/profile.png');
  });
  it('should handle the SET_PROFILE_IMAGE_ERROR action', () => {
    const result = profileReducer(initialState, { type: SET_PROFILE_IMAGE_ERROR, payload: 'unable to upload the image' });
    expect(result.fetchImageError).toBe('unable to upload the image');
  });
  it('should handle the SET_EMAIL_NOTIFICATION action', () => {
    const result = profileReducer(initialState, { type: SET_EMAIL_NOTIFICATION, payload: true });
    expect(result.emailNotifications).toBe(true);
  });
  it('should handle the SET_EMAIL_NOTIFICATION_ERROR action', () => {
    const result = profileReducer(initialState,
      { type: SET_EMAIL_NOTIFICATION_ERROR, payload: 'not authorized' });
    expect(result.setEmailNotifError).toBe('not authorized');
  });
});
