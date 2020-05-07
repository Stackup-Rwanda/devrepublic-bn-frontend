import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../views/routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
export default App;
