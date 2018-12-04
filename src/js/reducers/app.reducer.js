'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';
//import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
//import { connectRouter } from 'connected-react-router/immutable'
//import TicTacToeReducer from 'reducers/tictactoe.reducer';
import { History } from 'history';
import ImageReducer from 'reducers/image.reducer';

const AppReducer = (history: History) => combineReducers({ router: connectRouter(history), image: ImageReducer });

export default AppReducer;
