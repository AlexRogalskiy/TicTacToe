'use strict';

/**
 * Module dependencies
 */
import { SET_VISIBILITY_FILTER, RESET_VISIBILITY_FILTER } from 'constants/visibility-filter.constant';
import type { VisibilityFilterData, VisibilityFilterAction } from 'types/visibility-filter.type';

export const setVisibilityFilter = (data: VisibilityFilterData): VisibilityFilterAction => ({
	type: SET_VISIBILITY_FILTER,
	filter: data
});

export const resetVisibilityFilter = (): VisibilityFilterAction => ({
	type: RESET_VISIBILITY_FILTER
});

/*
import * as actions from './index'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: 'ADD_TODO',
      id: 0,
      text: 'Use Redux'
    })
  })

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    })
  })

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'TOGGLE_TODO',
      id: 1
    })
  })
})
*/