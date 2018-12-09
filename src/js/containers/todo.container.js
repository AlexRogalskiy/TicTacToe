'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import { reset, add, remove, toggle } from 'actions/todo.action';
import TodoListControl from 'components/controls/todo-list.control';
import TodoSelector from 'selectors/todo.selector';
import type { TodoItem, TodoProps, TodoFilterState, TodoList, DispatchProps } from 'types/todo.type';//Dispatch
import type { VisibilityFilterData } from 'types/visibility-filter.type';
import { VISIBILITY_FILTERS } from 'constants/visibility-filter.constant';

const mapStateToProps = (state: TodoFilterState): TodoProps => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	list: TodoSelector(state)
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
// @flow

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import VisibleTodoList from './VisibleTodoList';
import { toggleTodo } from '../actions/todos';
import { setVisibilityFilter } from '../actions/visibilityFilter';

const setup = (setupProps = {}) => {
  const store = configureStore()({
    todos: [
      {
        text: 'Test AddTodo',
        completed: false,
        id: 0
      },
      {
        text: 'Test AddTodo',
        completed: true,
        id: 1
      }
    ]
  });
  const wrapper = shallow(<VisibleTodoList store={store} />);

  return {
    store,
    wrapper
  };
};

describe('VisibleTodoList', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('shows all todos when SHOW_ALL filter is active', () => {
    const { store, wrapper } = setup();
    store.dispatch(setVisibilityFilter('SHOW_ALL'));

    expect(store.getActions()).toEqual([setVisibilityFilter('SHOW_ALL')]);

    expect(wrapper).toMatchSnapshot();
  });

  test('shows active todos when SHOW_ACTIVE filter is active', () => {
    const { store, wrapper } = setup();

    store.dispatch(setVisibilityFilter('SHOW_ACTIVE'));

    expect(store.getActions()).toEqual([setVisibilityFilter('SHOW_ACTIVE')]);

    expect(wrapper).toMatchSnapshot();
  });

  test('shows completed todos when SHOW_COMPLETED filter is active', () => {
    const { store, wrapper } = setup();
    store.dispatch(setVisibilityFilter('SHOW_COMPLETED'));

    expect(store.getActions()).toEqual([setVisibilityFilter('SHOW_COMPLETED')]);

    expect(wrapper).toMatchSnapshot();
  });

  test('toggles todos when a todo is clicked', () => {
    const { store, wrapper } = setup();

    expect(wrapper.shallow()).toMatchSnapshot();
    wrapper.shallow().find('Todo').first().simulate('click');
    expect(store.getActions()).toEqual([toggleTodo(0)]);
  });
});
*/