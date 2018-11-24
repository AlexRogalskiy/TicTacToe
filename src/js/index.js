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

import AppView from 'views/app.view';
import ImageContainer from 'containers/image.container';
import TicTacToeStore from 'stores/tictactoe.store';
import ImageStore from 'stores/image.store';
import registerServiceWorker from 'vendor/service/service-worker';

/* @flow */
type Props = {
	component: React.ComponentType<{}>,
	store: React.ComponentType<{}>,
	wrapper: HTMLElement
};

const render = (props: Props): void =>
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
	//render({ component: AppView, store: TicTacToeStore, wrapper });
	render({ component: ImageContainer, store: ImageStore, wrapper });
	registerServiceWorker();
}
