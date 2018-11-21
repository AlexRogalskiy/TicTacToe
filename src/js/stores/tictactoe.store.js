'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { isFunction } from 'app-root/libs/helpers.lib';

import TicTacToeReducer from 'app-root/reducers/tictactoe.reducer';

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then) ? Promise.resolve(action).then(next) : Promise.resolve(next(action));

//const TicTacToeStore = createStore(TicTacToeReducer, applyMiddleware(logger));

const createTicTacToeStore = applyMiddleware(promiseMiddleware, logger)(createStore);
const TicTacToeStore = createTicTacToeStore(TicTacToeReducer);

export default TicTacToeStore;
