'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
//import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'connected-react-router';

import MenuView from 'views/menu.view';
import MainView from 'views/main.view';
import ItemView from 'views/item.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import ItemsView from 'views/items.view';
import NotFoundView from 'views/not-found.view';

import { routes } from 'app-root/routes';

import { Elements } from 'libs/elements.lib';
import RedirectStatusRoute from 'app-root/routes/redirect-status.route';
import ScrollTopRoute from 'app-root/routes/scroll-top.route';

let items = [];
let logo = '';
items.push({ path: '', title: 'Home', className: 'menu-item' });
items.push({ path: 'about', title: 'About', className: 'menu-item' });
items.push({ path: 'items', title: 'Items', className: 'menu-item' });

//<BrowserRouter></BrowserRouter>
//<HashRouter></HashRouter>
//<Router history={ createHistory(queryHistory) }>
//const AppRouter = (queryHistory: Object<any> = { queryKey: false }): Node => (
const AppRouter = ({ history }): Node => (
	<ConnectedRouter history={history}>
		<ScrollTopRoute>
			<MenuView items={items} />
			<Elements.View className='App-intro'>
				<Switch>
				  <Route path='/' component={MainView} exact />
				  <Route path='/item/:id' component={ItemView} />
				  <Route path='/home' component={HomeView} />
				  <Route path='/about' component={AboutView} />
				  <Route path='/items' component={ItemsView} />
				  <RedirectStatusRoute status={301} from='/users' to='/profiles' />
				  <RedirectStatusRoute status={302} from='/courses' to='/dashboard' />
				  <Route component={NotFoundView} />
				  <Redirect from='*' to='/' />
				</Switch>
			</Elements.View>
		</ScrollTopRoute>
      </ConnectedRouter>
);

export default AppRouter;
