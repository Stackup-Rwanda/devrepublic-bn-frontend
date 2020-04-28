import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';
import Login from '../components/authentication/login';
import resetPassword from '../components/authentication/resetPassword';
import forgotPassword from '../components/authentication/forgotPassword';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/reset-password/:token" component={resetPassword} />
    <Route exact path="/forgot-password" component={forgotPassword} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
