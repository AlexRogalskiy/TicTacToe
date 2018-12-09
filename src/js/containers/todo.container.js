'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import { reset, add, remove, toggle } from 'actions/todo.action';
import TodoListControl from 'components/controls/todo-list.control';
import type { TodoItem, TodoProps, TodoFilterState, TodoItemState, DispatchProps } from 'types/todo.type';//Dispatch
import type { VisibilityFilterState } from 'types/visibility-filter.type';
import { VISIBILITY_FILTERS } from 'constants/visibility-filter.constant';

const getVisibleTodoItems = (list: Array<TodoItemState>, filter: VisibilityFilterState): Array<TodoItem> => {
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

const mapStateToProps = (state: TodoFilterState): TodoProps => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	list: getVisibleTodoItems(state.list.present, state.filter)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onReset:  () => dispatch(reset()),
	onAdd: 	  (data: TodoItem) => dispatch(add(data)),
	onRemove: (data: TodoItem) => dispatch(remove(data)),
	onToggle: (data: TodoItem) => dispatch(toggle(data))
});

const TodoContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoListControl);

export default TodoContainer;

/*
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};

export default connect()(AddTodo);
*/