import { GET_ALL_FACILITIES, GET_ALL_FACILITIES_ERROR } from '../actions/actions';

const initialState = {
  facilities: [],
  error: null,
};

const facilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FACILITIES:
      return { facilities: action.payload, error: null };
    case GET_ALL_FACILITIES_ERROR:
      return { error: action.payload, facilities: [] };
    default:
      return state;
  }
};
export default facilityReducer;
