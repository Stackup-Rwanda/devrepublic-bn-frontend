import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from '../views/routes';
import NavBarComponent from './sharedComponents/NavbarComponent';
import Footer from './sharedComponents/Footer';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <NavBarComponent />
    <Routes />
    <Footer />
  </BrowserRouter>
);
export default App;
