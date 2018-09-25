"use strict";

/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './vendor/service-worker';

import style from "../css/style.css";

import App from './views/app';
import store from './stores/index';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();