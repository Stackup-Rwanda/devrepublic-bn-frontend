import axios from 'axios';
import { GET_ALL_FACILITIES, GET_ALL_FACILITIES_ERROR } from './actions';
import axiosOption from '../../util/axiosOption';

export const getAllFacilities = (data) => ({ type: GET_ALL_FACILITIES, payload: data });
export const getAllFacilitiesError = (error) => ({ type: GET_ALL_FACILITIES_ERROR, payload: error });

export const getFacilities = (token) => async (dispatch) => {
  try {
    const result = await axios.get(`${process.env.BACKEND_LINK}/api/v1/facilities`, axiosOption(token));
    dispatch(getAllFacilities(result.data.data));
  } catch (error) {
    dispatch(getAllFacilitiesError(error.response.data.error));
  }
};
