import { combineReducers } from 'redux';

import cells from './cells';
import player from './player';

const TicTacToeFlow = combineReducers({cells, player});

export default TicTacToeFlow;