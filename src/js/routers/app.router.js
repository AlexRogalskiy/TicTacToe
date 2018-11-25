'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

import MainView from 'views/main.view';
import ItemView from 'views/item.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import ItemsView from 'views/items.view';
import NotFoundView from 'views/not-found.view';

import { routes } from 'app-root/routes';

import RedirectStatusRoute from 'app-root/routes/redirect-status.route';

const RouterSwitch = (routes: Object<any>): Node => (
  <Switch>
    {routes.map(route => (
      <Route {...route} />
    ))}
  </Switch>
);

const AppRouter = (queryHistory: Object<any> = { queryKey: false }): Node => (
	<Router history={ createHistory(queryHistory) }>
		<MenuView />
        <Switch>
          <Route path='/' component={MainView} exact />
		  <Route path='/item/:id' component={ItemView} />
		  <Route path='/home' component={HomeView} />
		  <Route path='/about' component={AboutView} />
		  <Route path='/items' component={ItemsView} />
		  <Route component={NotFoundView} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
);

//<RedirectStatusRoute status={301} from="/users" to="/profiles" />
//<RedirectStatusRoute status={302} from="/courses" to="/dashboard" />

export default AppRouter;
