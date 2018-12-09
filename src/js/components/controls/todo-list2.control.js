// @flow
import React from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo.view'

export type Props = {
  list: TodoList,
  onClick: (id: Id) => void
};

const TodoList2Control = ({ list, onClick }) => (
  <ul>
    {list.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onClick(todo.id)}
      />
    )}
  </ul>
);

export default TodoList2Control;

/*
// @flow

import React from 'react';
import { shallow } from 'enzyme';

import TodoList from './TodoList';

const setup = (setupProps = {}) => {
  const defaultProps = {
    todos: [],
    onTodoClick: jest.fn()
  };
  const props = { ...defaultProps, ...setupProps };
  const wrapper = shallow(
    <TodoList todos={props.todos} onTodoClick={props.onTodoClick} />
  );

  return {
    props,
    wrapper
  };
};

describe('TodoList', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('with todos', () => {
    const { wrapper, props } = setup({
      todos: [
        {
          text: 'Test AddTodo',
          completed: false,
          id: 0
        }
      ]
    });

    test('renders a list of todos', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('todo onClick calls onTodoClick', () => {
      wrapper.find('Todo').simulate('click');
      expect(props.onTodoClick).toHaveBeenCalled();
    });
  });
});
*/