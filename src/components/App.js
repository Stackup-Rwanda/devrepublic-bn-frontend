import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import test from '../redux/actions/test-redux';
import './app.scss';

const App = () => {
  const testMessage = useSelector((state) => state.test);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="welcome">Welcome to Barefoot Nomad</h1>
      <h3>{testMessage}</h3>
      <button type="submit" onClick={() => dispatch(test())}>Test Redux</button>
    </div>
  );
};
export default App;
