'use strict';

/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

import style from '../css/style.css';

import AppView from 'app-root/views/app.view';
import TicTacToeStore from 'app-root/stores/tictactoe.store';
import registerServiceWorker from 'app-root/vendor/service/service-worker';

// @flow
type Props = {
	component: React.ComponentType<{}>,
	store: React.ComponentType<{}>,
	wrapper: HTMLElement
};

const render = (props: Props) =>
	ReactDOM.render(
    <Provider store={props.store}>
      <Router history={ createHistory({ queryKey: false }) }>
        <Switch>
          <Route exact path='/' component={props.component} />
		  <Route path="/:id" component={props.component} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </Provider>,
    props.wrapper
);

const wrapper = document.getElementById('root');
if (wrapper) {
	render({ component: AppView, store: TicTacToeStore, wrapper });
	registerServiceWorker();
}
