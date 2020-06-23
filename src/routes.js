import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import UpdateLocation from './pages/UpdateLocation';
import FlagInfected from './pages/FlagInfected';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register-player" component={Register} />
      <Route exact path="/update" component={UpdateLocation} />
      <Route exact path="/flag" component={FlagInfected} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
