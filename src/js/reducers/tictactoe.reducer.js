'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import { CellsReducer as cells } from 'reducers/cells.reducer';
import { PlayerReducer as player } from 'reducers/player.reducer';
import { BoardReducer as board } from 'reducers/board.reducer';

const TicTacToeReducer = combineReducers({ cells, player, board });

export default TicTacToeReducer;
