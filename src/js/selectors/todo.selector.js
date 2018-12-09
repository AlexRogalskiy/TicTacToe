'use strict';

/**
 * Module dependencies
 */
import { createSelector } from 'reselect';

import type { TodoList, TodoFilterState } from 'types/todo.type';//Dispatch
import type { VisibilityFilterData } from 'types/visibility-filter.type';
import { VISIBILITY_FILTERS } from 'constants/visibility-filter.constant';

/* @flow */
const listSelector = (state: TodoFilterState): TodoList => state.list;
const filterSelector = (state: TodoFilterState): VisibilityFilterData => state.filter;

const getVisibleTodoItems = (list: TodoList, filter: VisibilityFilterData): TodoList => {
	switch (filter) {
		case VISIBILITY_FILTERS.SHOW_ALL:
			return list;
		case VISIBILITY_FILTERS.SHOW_COMPLETED:
			return list.filter(t => t.completed)
		case VISIBILITY_FILTERS.SHOW_ACTIVE:
			return list.filter(t => !t.completed)
		default:
			throw new Error(`ERROR: unknown visibility filter = ${filter}`)
	}
};

export const TodoSelector = createSelector(
	listSelector,
	filterSelector,
	getVisibleTodoItems
);

/*
// @flow

import { visibleTodosSelector } from './index';

describe('visibleTodosSelector', () => {
  let state;
  beforeEach(() => {
    state = {
      todos: [
        { id: 0, text: 'Test Todo 1', completed: false },
        { id: 1, text: 'Test Todo 2', completed: true }
      ],
      visibilityFilter: 'SHOW_ALL'
    };
  });

  test('should handle SHOW_ALL', () => {
    expect(visibleTodosSelector(state)).toEqual([
      { id: 0, text: 'Test Todo 1', completed: false },
      { id: 1, text: 'Test Todo 2', completed: true }
    ]);
  });

  test('should handle SHOW_ACTIVE', () => {
    state.visibilityFilter = 'SHOW_ACTIVE';
    expect(visibleTodosSelector(state)).toEqual([
      { id: 0, text: 'Test Todo 1', completed: false }
    ]);
  });

  test('should handle SHOW_COMPLETED', () => {
    state.visibilityFilter = 'SHOW_COMPLETED';
    expect(visibleTodosSelector(state)).toEqual([
      { id: 1, text: 'Test Todo 2', completed: true }
    ]);
  });
});
*/