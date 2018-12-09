'use strict';

/**
 * Module dependencies
 */
import undoable, { includeAction } from 'redux-undo';

import { RESET_TODO, ADD_TODO, REMOVE_TODO, EDIT_TODO, COMPLETE_ALL_TODO, CLEAR_COMPLETED_ALL_TODO, TOGGLE_TODO } from 'constants/todo.constant';
import type { TodoItemState, TodoState, TodoAction, TodoItem } from 'types/todo.type';

const initialState: TodoState = {
	list: []
};

const createTodoItem = (id: string, text: string): TodoItem => ({
	id,//state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
	text,
	completed: false
});

const editTodoItem = (item: TodoItem, id: string): TodoItem => (item.id !== id ? item : { ...item, text: action.text });
const toggleTodoItem = (item: TodoItem, id: string): TodoItem => (item.id !== id ? item : { ...item, completed: !item.completed });

const TodoReducer = (state: TodoItemState = {}, action: TodoAction = {}): TodoItemState => {
  switch (action.type) {
    case ADD_TODO:
		return createTodoItem(action.id, action.text);
    case TOGGLE_TODO:
		return toggleTodoItem(state, action.id);
    case EDIT_TODO:
		return editTodoItem(state, action.id);
    default:
	  (action: empty);
      return state;
  }
};

const TodoListReducer = (state: TodoState = initialState, action: TodoAction = {}): TodoState => {
  switch (action.type) {
    case ADD_TODO: 
		return {
			list: [
				...state.list,
				TodoReducer(undefined, action)
			]
		};
    case EDIT_TODO: 
		return {
			list: state.map(todo =>
				TodoReducer(todo, action)
			)
		};
    case TOGGLE_TODO:
		return {
			list: state.list.map(todo =>
				TodoReducer(todo, action)
			)
		};
    case REMOVE_TODO: 
		return {
			list: state.list.filter(todo =>
				(todo.id !== action.id)
			)
		};
    case COMPLETE_ALL_TODO:
		const areAllMarked = state.list.every(todo => todo.completed)
		return {
			list: state.list.map(todo => ({
				...todo,
				completed: !areAllMarked
			}))
		};
    case CLEAR_COMPLETED_ALL_TODO:
		return {
			list: state.list.filter(todo => todo.completed === false)
		};
    case RESET_TODO:
		return initialState;
    default:
		(action: empty);
		return state;
	}
};

const UnloadableTodoListReducer = undoable(TodoListReducer, { filter: includeAction([ADD_TODO, EDIT_TODO, TOGGLE_TODO]) });

export default UnloadableTodoListReducer;

/*
import todos from './todos'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: 'ADD_TODO',
        text: 'Run the tests',
        id: 0
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ], {
        type: 'ADD_TODO',
        text: 'Use Redux',
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 1
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 1
        }
      ], {
        type: 'ADD_TODO',
        text: 'Fix the tests',
        id: 2
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 1
      }, {
        text: 'Fix the tests',
        completed: false,
        id: 2
      }
    ])
  })

  it('should handle TOGGLE_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: 'TOGGLE_TODO',
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })
})
*/