/* eslint-disable no-prototype-builtins */

const createReducer = (initialState, handlers) => function reducer(state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
export default createReducer;
