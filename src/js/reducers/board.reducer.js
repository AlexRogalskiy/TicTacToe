'use strict';

/**
 * Module dependencies
 */
import { START, INITIALIZE, RESET, FINALIZE, ADD_MOVE } from 'constants/tictactoe.constant';
import type { BoardAction, Board } from 'types/tictactoe.type';
import { guidGenerator, DateTime } from 'libs/helpers.lib';
import config from 'resources/config.json';

const initialState: Board = {
	title: config[config.default.scheme].title,
	id: guidGenerator(),
	date: null
};

const BoardReducer = (
  state: Board = initialState,
  action: BoardAction = {}
): Board => {
  switch (action.type) {
    case START:
      return {
        title: state.title,
        id: state.id,
        date: DateTime.currentDate() + '/' + DateTime.currentTime(),
      };
    case INITIALIZE:
      return { title: state.title, id: state.id, date: null };
    case RESET:
      return {
        title: state.title,
        id: state.id,
        date: DateTime.currentDate() + '/' + DateTime.currentTime(),
      };
    case FINALIZE:
    case ADD_MOVE:
    default:
	  (action: empty);
      return state;
  }
};

export default BoardReducer;