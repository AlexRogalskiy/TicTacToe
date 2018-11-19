'use strict';

/**
 * Module dependencies
 */
import { START, INITIALIZE, RESET, FINALIZE, ADD_MOVE } from 'app-root/constants/tictactoe.constant';
import { guidGenerator, currentDate, currentTime } from 'app-root/libs/helpers.lib';
import config from 'app-root/resources/config.json';

const scheme = config.default.scheme;

const BoardReducer = (
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

export default BoardReducer;