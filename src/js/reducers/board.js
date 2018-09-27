"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

import config from '../resources/config.json';
import { guidGenerator, currentDate, currentTime } from '../libs/helpers';

const board = (state = config.default.title, action) => {
    switch (action.type) {
		case START:
			return config.default.title + ' <' + guidGenerator() + '>';
		case INITIALIZE:
			return config.default.title;
        case RESET:
			return config.default.title + ' <' + guidGenerator() + '> ' + currentDate() + '/' + currentTime();
		case FINALIZE:
		case ADD_MOVE:
        default:
            return state;
    }
};

export default board;