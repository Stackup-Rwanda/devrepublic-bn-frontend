import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';
import LoginPage from '../components/authentication/Login';
import resetPassword from '../components/authentication/resetPassword';
import forgotPassword from '../components/authentication/forgotPassword';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/password/reset" component={resetPassword} />
    <Route exact path="/password/forgot" component={forgotPassword} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
