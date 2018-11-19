'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import CellsReducer from 'app-root/reducers/cells.reducer';
import PlayerReducer from 'app-root/reducers/player.reducer';
import BoardReducer from 'app-root/reducers/board.reducer';

const TicTacToeReducer = combineReducers({ CellsReducer, PlayerReducer, BoardReducer });

export default TicTacToeReducer;
