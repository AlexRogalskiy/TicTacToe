'use strict';

/**
 * Module dependencies
 */
import { RESET_TODO, ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_TODO, COMPLETE_ALL_TODO, CLEAR_COMPLETED_ALL_TODO } from 'constants/todo.constant';
import type { TodoItem, TodoAction } from 'types/todo.type';

export const reset = (): TodoAction => ({
	type: RESET_TODO
});

export const add = (data: TodoItem): TodoAction => ({
	type: ADD_TODO,
	data.text
});

export const remove = (data: TodoItem): TodoAction => ({
	type: REMOVE_TODO,
	data.id
});

export const edit = (data: TodoItem): TodoAction => ({
	type: REMOVE_TODO,
	data.id,
	data.text
});

export const toggle = (data: TodoItem): TodoAction => ({
	type: TOGGLE_TODO,
	data.id
});

export const completeAllTodos = (): TodoAction => ({
	type: COMPLETE_ALL_TODO,
});

export const completeAllTodos = (): TodoAction => ({
	type: CLEAR_COMPLETED_ALL_TODO,
});

/*
import * as types from '../constants/ActionTypes'
import * as actions from './index'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      text: 'Use Redux'
    })
  })

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      id: 1
    })
  })

  it('editTodo should create EDIT_TODO action', () => {
    expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
      type: types.EDIT_TODO,
      id: 1,
      text: 'Use Redux everywhere'
    })
  })

  it('completeTodo should create COMPLETE_TODO action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      id: 1
    })
  })

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS
    })
  })

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    })
  })
})
*/