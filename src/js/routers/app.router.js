'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
//import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'connected-react-router';
// using an ES6 transpiler, like babel
import { matchRoutes, renderRoutes } from 'react-router-config';
//const branch = matchRoutes(AppRoute, "/child/23");
import { History } from 'history';

// routes
import AppRoute from 'app-root/routes/app.route';

import MenuView from 'views/menu.view';
import MainView from 'views/main.view';
import ItemView from 'views/item.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import ItemsView from 'views/items.view';
import NoMatchView from 'views/no-match.view';

import { routes } from 'app-root/routes';

import { Elements } from 'libs/elements.lib';
import RedirectStatusRoute from 'app-root/routes/redirect-status.route';
import ScrollTopRoute from 'app-root/routes/scroll-top.route';

/* @flow */
type Props = {
	history: History;
};

let items = [];
let logo = '';
items.push({ path: '', title: 'Home', className: 'menu-item' });
items.push({ path: 'about', title: 'About', className: 'menu-item' });
items.push({ path: 'items', title: 'Items', className: 'menu-item' });

//<BrowserRouter></BrowserRouter>
//<HashRouter></HashRouter>
//<Router history={ createHistory(queryHistory) }>
//const AppRouter = (queryHistory: Object<any> = { queryKey: false }): Node => (
const AppRouter = ({ history }: Props): Node => (
	<ConnectedRouter history={history}>
		<ScrollTopRoute>
			<MenuView items={items} />
			<Elements.View className='App-intro'>
				<Switch>
				  { renderRoutes(AppRoute) }
				  { /*	  <Route path='/' component={MainView} exact />
				  <Route path='/item/:id' component={ItemView} />
				  <Route path='/home' component={HomeView} />
				  <Route path='/about' component={AboutView} />
					  <Route path='/items' component={ItemsView} /> */ }
				  <RedirectStatusRoute status={301} from='/users' to='/profiles' />
				  <RedirectStatusRoute status={302} from='/courses' to='/dashboard' />
				  <Route component={NoMatchView} />
				  <Redirect from='*' to='/' />
				</Switch>
			</Elements.View>
		</ScrollTopRoute>
      </ConnectedRouter>
);

export default AppRouter;
