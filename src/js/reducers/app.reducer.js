'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
//import { connectRouter } from 'connected-react-router/immutable'
//import TicTacToeReducer from 'reducers/tictactoe.reducer';
import ImageReducer from 'reducers/image.reducer';

const AppReducer = (history) => combineReducers({ router: connectRouter(history), image: ImageReducer });

export default AppReducer;
