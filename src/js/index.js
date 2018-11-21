'use strict';

/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import style from '../css/style.css';

import AppView from 'app-root/views/app.view';
import TicTacToeStore from 'app-root/stores/tictactoe.store';
import registerServiceWorker from 'app-root/vendor/service-worker';

// @flow
type Props = {
	component: React.ComponentType<{}>,
	store: React.ComponentType<{}>,
	wrapper: HTMLButtonElement
};

const renderRoot = (props: Props) =>
  ReactDOM.render(
    <Provider store={props.store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={props.component} />
          <Redirect from='*' to='/' />
        </Switch>
      </BrowserRouter>
    </Provider>,
    props.wrapper
  );

const wrapper = document.getElementById('root');
if (wrapper) {
  renderRoot({ component: AppView, store: TicTacToeStore, wrapper });
  registerServiceWorker();
}
