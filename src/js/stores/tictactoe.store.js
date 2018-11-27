'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import TicTacToeReducer from 'reducers/tictactoe.reducer';
import { isFunction } from 'libs/helpers.lib';

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then)
		? Promise.resolve(action).then(next)
		: Promise.resolve(next(action));

//const TicTacToeStore = createStore(TicTacToeReducer, applyMiddleware(promiseMiddleware, logger));
const createTicTacToeStore = applyMiddleware(promiseMiddleware, logger)(createStore);
const TicTacToeStore = createTicTacToeStore(TicTacToeReducer);

export default TicTacToeStore;
