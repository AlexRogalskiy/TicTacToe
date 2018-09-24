"use strict";

/**
 * Module dependencies
 */
require('../css/reset.css');
require('../css/normalize.css');
require('../css/font.css');
//require('../css/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import style from "../css/style.css";

import AppView from './layouts/view';
import store from './resources/store';

ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>,
    document.getElementById('root')
);