import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../components/sharedComponents/notFound';
import Home from '../components/sharedComponents/home';
import LoginPage from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import ProfileComponent from '../components/profile/Profile';
import ResetPassword from '../components/authentication/resetPassword';
import ForgotPassword from '../components/authentication/forgotPassword';
import Dashboard from '../components/dashboards/index';
import Stats from '../components/sharedComponents/Stats';
import Facilities from '../components/facilities/Facilities';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile" component={ProfileComponent} />
    <Route exact path="/password/reset" component={ResetPassword} />
    <Route exact path="/password/forgot" component={ForgotPassword} />
    <Route exact path="/facilities" component={Facilities} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/stats" component={Stats} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
