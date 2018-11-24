'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import CellsReducer from 'reducers/cells.reducer';
import PlayerReducer from 'reducers/player.reducer';
import BoardReducer from 'reducers/board.reducer';

const TicTacToeReducer = combineReducers({ cells: CellsReducer, player: PlayerReducer, board: BoardReducer });

export default TicTacToeReducer;
