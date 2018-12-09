'use strict';

/**
 * Module dependencies
 */
import { RESET_TODO, ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from 'constants/todo.constant';
import type { TodoItem, TodoAction } from 'types/todo.type';

let nextTodoId = 0;

export const reset = (): TodoAction => ({
	type: RESET_TODO
});

export const add = (data: TodoItem): TodoAction => ({
	type: ADD_TODO,
	id: nextTodoId++,
	data.text
});

export const remove = (data: TodoItem): TodoAction => ({
	type: REMOVE_TODO,
	data.id
});

export const toggle = (data: TodoItem): TodoAction => ({
	type: TOGGLE_TODO,
	data.id
});
