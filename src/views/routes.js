import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';
import LoginPage from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import ProfileComponent from '../components/profile/Profile';
import Dashboard from '../components/dashboards/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile" component={ProfileComponent} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
