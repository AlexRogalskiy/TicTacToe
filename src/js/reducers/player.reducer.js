'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'constants/tictactoe.constant';
import type { PlayerAction, Player } from 'types/tictactoe.type';
import config from 'resources/config.json';
import { randomBinary } from 'libs/helpers.lib';

const scheme = config.default.scheme;
const initialState: Player = config[scheme].player1.marker;

const PlayerReducer = (state: Player = initialState, action: PlayerAction = {}): Player => {
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