"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

import config from '../resources/config.json';
import { randomBinary } from '../libs/helpers';

const player = (state = config.default.player1.marker, action) => {
    switch (action.type) {
        case ADD_MOVE:
            return (state === config.default.player1.marker) ? config.default.player2.marker : config.default.player1.marker;
		case START:
		case INITIALIZE:
			return config.default.player1.marker;
        case RESET:
            return config.default['player' + (randomBinary() + 1)].marker;
		case FINALIZE:
			return config.default.marker;
        default:
            return state;
    }
};

export default player;