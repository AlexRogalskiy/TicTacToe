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
import { spring, AnimatedSwitch } from 'react-router-transition';
//import { css } from 'glamor';

/*const switchRule = css`
  position: relative;
  & > div {
    position: absolute;
  }
`;*/

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

const mapStyles = (styles) => ({
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
});

const bounce = (value) => {
	return spring(value, {
		stiffness: 330,
		damping: 22
	});
};

const bounceTransition = {
	atEnter: {
		opacity: 0,
		scale: 1.2
	},
	atLeave: {
		opacity: bounce(0),
		scale: bounce(0.8)
	},
	atActive: {
		opacity: bounce(1),
		scale: bounce(1)
	}
};
//{...pageTransitions}

//<BrowserRouter basename="/calendar"/>
//const supportsHistory = 'pushState' in window.history
//<BrowserRouter forceRefresh={!supportsHistory} keyLength={12}></BrowserRouter>
/*const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}
<BrowserRouter getUserConfirmation={getConfirmation}/>*/

//<HashRouter></HashRouter>
//<Router history={ createHistory(queryHistory) }>
//const AppRouter = (queryHistory: Object<any> = { queryKey: false }): Node => (
const AppRouter = ({ history }: Props): Node => (
	<ConnectedRouter history={history}>
		<AnimatedSwitch
		  atEnter={ bounceTransition.atEnter }
		  atLeave={ bounceTransition.atLeave }
		  atActive={ bounceTransition.atActive }
		  mapStyles={ mapStyles }
		  runOnMount={ location.pathname === '/' }
		  className='route-wrapper'
		>
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
		</AnimatedSwitch>
      </ConnectedRouter>
);

export default AppRouter;
