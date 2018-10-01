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
} from '../constants/action-types';

import config from '../resources/config.json';
import { guidGenerator, currentDate, currentTime } from '../libs/helpers';

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
