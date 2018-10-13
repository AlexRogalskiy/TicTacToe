'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, START, INITIALIZE, RESET, FINALIZE } from 'app-root/constants/tictactoe-constants';

const cells = (
  state = [
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
  action
) => {
  switch (action.type) {
    case ADD_MOVE:
      return state.map((item, cell) => {
        return cell === action.cell ? action.player : item;
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
      ];
    default:
      return state;
  }
};

export default cells;