'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'constants/tictactoe.constant';
import type { CellsAction, Cells } from 'types/tictactoe.type';

const CellsReducer = (
  state: Cells = [
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
  action: CellsAction = {}
): Cells => {
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