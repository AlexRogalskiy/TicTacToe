'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'app-root/constants/tictactoe.constant';

// @flow
type State = Array<string>;
type Action = {
	type: string,
	cell?: number,
	player?: string
};

const CellsReducer = (
  state: State = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  action: Action
) => {
  switch (action.type) {
    case ADD_MOVE:
      return state.map((item, cell) => {
        return (cell === action.cell ? action.player : item);
      });
    case START:
    case INITIALIZE:
    case RESET:
    case FINALIZE:
      return [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	  ]
    default:
	  (action: empty);
      return state;
  }
};

export default CellsReducer;