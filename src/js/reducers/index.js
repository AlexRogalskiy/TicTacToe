'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import cells from 'app-root/reducers/cells';
import player from 'app-root/reducers/player';
import board from 'app-root/reducers/board';

const TicTacToeFlow = combineReducers({ cells, player, board });

export default TicTacToeFlow;
