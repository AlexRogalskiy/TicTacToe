'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import TicTacToeFlow from 'app-root/reducers/index';

let TicTacToeStore = createStore(TicTacToeFlow, applyMiddleware(logger));

export default TicTacToeStore;
