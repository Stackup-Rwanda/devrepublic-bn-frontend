const initialState = {
  message: 'current state',
};

const testReducer = (state = initialState.message, action) => {
  switch (action.type) {
    case 'TEST_REDUX':
      return action.payload;
    default:
      return state;
  }
};

export default testReducer;
