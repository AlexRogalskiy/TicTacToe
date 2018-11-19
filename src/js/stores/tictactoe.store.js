'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import TicTacToeReducer from 'app-root/reducers/tictactoe.reducer';

const TicTacToeStore = createStore(TicTacToeReducer, applyMiddleware(logger));

export default TicTacToeStore;
