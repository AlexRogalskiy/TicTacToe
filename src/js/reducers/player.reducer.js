'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'app-root/constants/tictactoe.constant';
import type { PlayerAction, PlayerState } from 'app-root/types/tictactoe.type';

import config from 'app-root/resources/config.json';
import { randomBinary } from 'app-root/libs/helpers.lib';

const scheme = config.default.scheme;
const initialState: PlayerState = config[scheme].player1.marker;

const PlayerReducer = (state: PlayerState = initialState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case ADD_MOVE:
      return state === config[scheme].player1.marker
        ? config[scheme].player2.marker
        : config[scheme].player1.marker;
    case START:
    case INITIALIZE:
      return config[scheme].player1.marker;
    case RESET:
      return config[scheme]['player' + (randomBinary() + 1)].marker;
    case FINALIZE:
    default:
	  (action: empty);
      return state;
  }
};

export default PlayerReducer;