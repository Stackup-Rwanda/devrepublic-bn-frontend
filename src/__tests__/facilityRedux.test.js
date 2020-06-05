/* eslint-disable prefer-promise-reject-errors */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { getAllFacilities, getAllFacilitiesError, getFacilities } from '../redux/actions/facilityActions';
import { GET_ALL_FACILITIES, GET_ALL_FACILITIES_ERROR } from '../redux/actions/actions';
import facilityReducer from '../redux/reducers/facilityReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('facilities redux actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  it('getAllFacilities should return a plain object', () => {
    const data = [{ facilityName: 'Mariot' }];
    const result = getAllFacilities(data);
    expect(result.type).toBe(GET_ALL_FACILITIES);
    expect(result.payload).toEqual(data);
  });
  it('getAllFacilitiesError should return a plain object', () => {
    const error = 'error message';
    const result = getAllFacilitiesError(error);
    expect(result.type).toBe(GET_ALL_FACILITIES_ERROR);
    expect(result.payload).toEqual(error);
  });
  it('should dispatch an setUserInfo action', async () => {
    const result = { type: GET_ALL_FACILITIES, payload: [{ facilityName: 'Mariot' }] };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: [{ facilityName: 'Mariot' }] } }));

    await store.dispatch(getFacilities('sffscasaasdfsa'));
    expect(store.getActions()).toEqual([result]);
  });
  it('should dispatch a get profile error action', async () => {
    const result = { type: GET_ALL_FACILITIES_ERROR, payload: 'invalid token' };
    axios.get.mockImplementationOnce(() => Promise.reject({ response: { data: { error: 'invalid token' } } }));
    await store.dispatch(getFacilities('sffscasaasdfsa'));
    expect(store.getActions()).toEqual([result]);
  });
});

describe('facility reducer', () => {
  const initialState = {
    facilities: [],
    error: null,
  };
  it('should return the initial reducer', () => {
    expect(facilityReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle the GET_ALL_FACILITIES action', () => {
    const result = facilityReducer(initialState, { type: GET_ALL_FACILITIES, payload: [{ facilityName: 'Mariott', id: 'dscsdcsdcds' }] });
    expect(result).toEqual({ ...initialState, facilities: [{ facilityName: 'Mariott', id: 'dscsdcsdcds' }] });
  });
  it('should handle the GET_ALL_FACILITIES_ERROR action', () => {
    const result = facilityReducer(initialState, { type: GET_ALL_FACILITIES_ERROR, payload: 'This is an error' });
    expect(result).toEqual({ ...initialState, error: 'This is an error' });
  });
});
