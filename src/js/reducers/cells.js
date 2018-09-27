"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

const cells = (state = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], action) => {
    switch (action.type) {
        case ADD_MOVE:
            return state.map((item, cell) => {
                return (cell === action.cell) ? action.player : item;
            });
		case START:
		case INITIALIZE:
        case RESET:
            return [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
		case FINALIZE:
			return [];
        default:
            return state;
    }
};

export default cells;