'use strict';

/**
 * Module dependencies
 */
import { combineReducers } from 'redux';

import TodoListReducer from 'reducers/todo-list.reducer';
import VisibilityFilterReducer from 'reducers/visibility-filter.reducer';

export default combineReducers({ list: TodoListReducer, filter: VisibilityFilterReducer });

/*
// @flow

import reducer from './index';

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(reducer({}, { type: '@@INIT' })).toEqual({
      todos: [],
      visibilityFilter: 'SHOW_ALL'
    });
  });
});
*/