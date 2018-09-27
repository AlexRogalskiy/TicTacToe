"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

import config from '../resources/config.json';
import { randomBinary } from '../libs/helpers';

const scheme = config.default.scheme;

const player = (state = config[scheme].player1.marker, action) => {
    switch (action.type) {
        case ADD_MOVE:
            return (state === config[scheme].player1.marker) ? config[scheme].player2.marker : config[scheme].player1.marker;
		case START:
		case INITIALIZE:
			return config[scheme].player1.marker;
        case RESET:
            return config[scheme]['player' + (randomBinary() + 1)].marker;
		case FINALIZE:
			return config[scheme].marker;
        default:
            return state;
    }
};

export default player;