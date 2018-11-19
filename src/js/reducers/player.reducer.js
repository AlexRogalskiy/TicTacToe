'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'app-root/constants/tictactoe.constant';

import config from 'app-root/resources/config.json';
import { randomBinary } from 'app-root/libs/helpers.lib';

const scheme = config.default.scheme;

const PlayerReducer = (state = config[scheme].player1.marker, action) => {
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
      return state;
  }
};

export default PlayerReducer;