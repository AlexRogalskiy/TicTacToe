'use strict';

/**
 * Module dependencies
 */
import { START, INITIALIZE, RESET, FINALIZE, ADD_MOVE } from 'app-root/constants/tictactoe.constant';
import type { BoardAction, BoardState } from 'app-root/types/tictactoe.type';

import { guidGenerator, DateTime } from 'app-root/libs/helpers.lib';
import config from 'app-root/resources/config.json';

const initialState: BoardState = {
	title: config[config.default.scheme].title,
	id: guidGenerator(),
	date: null
};

const BoardReducer = (
  state: BoardState = initialState,
  action: BoardAction
): BoardState => {
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