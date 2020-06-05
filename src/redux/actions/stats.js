import axios from 'axios';
import { GET_STATS, GET_STATS_ERROR } from './actionsTypes';


export const getStatsAction = (token) => async (dispatch) => {
  const options = {
    headers: {
      token,
    },
  };
  try {
    const res = await axios.get(`${process.env.BACKEND_LINK}/api/v1/trips/stats`, options);
    return dispatch({ type: GET_STATS, payload: res.data.data });
  } catch (error) {
    return dispatch({ type: GET_STATS_ERROR, payload: error.response.data });
  }
};
