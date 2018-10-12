'use strict';

/**
 * Module dependencies
 */
import {
  ADD_MOVE,
  RESET,
  START,
  INITIALIZE,
  FINALIZE,
} from 'app-root/constants/tictactoe-constants';

import config from 'app-root/resources/config.json';
import { guidGenerator, currentDate, currentTime } from 'app-root/libs/helpers';

const scheme = config.default.scheme;

const board = (
  state = { title: config[scheme].title, id: guidGenerator(), date: null },
  action
) => {
  switch (action.type) {
    case START:
      return {
        title: state.title,
        id: state.id,
        date: currentDate() + '/' + currentTime(),
      };
    case INITIALIZE:
      return { title: state.title, id: state.id, date: null };
    case RESET:
      return {
        title: state.title,
        id: state.id,
        date: currentDate() + '/' + currentTime(),
      };
    case FINALIZE:
    case ADD_MOVE:
    default:
      return state;
  }
};

export default board;
