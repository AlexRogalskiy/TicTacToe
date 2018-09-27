"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

import config from '../resources/config.json';
import { guidGenerator, currentDate, currentTime } from '../libs/helpers';

const scheme = config.default.scheme;

const board = (state = config[scheme].title, action) => {
    switch (action.type) {
		case START:
			return config[scheme].title + ' <' + guidGenerator() + '>';
		case INITIALIZE:
			return config[scheme].title;
        case RESET:
			return config[scheme].title + ' <' + guidGenerator() + '> ' + currentDate() + '/' + currentTime();
		case FINALIZE:
		case ADD_MOVE:
        default:
            return state;
    }
};

export default board;