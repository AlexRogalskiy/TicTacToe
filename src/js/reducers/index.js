'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import cells from './cells';
import player from './player';
import board from './board';

const TicTacToeFlow = combineReducers({ cells, player, board });

export default TicTacToeFlow;
