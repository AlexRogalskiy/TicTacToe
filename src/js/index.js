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

const renderRoot = (Component, wrapper) =>
  ReactDOM.render(
    <Provider store={TicTacToeStore}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Component} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>,
    wrapper
  );

const wrapper = document.getElementById('root');

if (wrapper) {
  renderRoot(AppView, wrapper);
  registerServiceWorker();
}
