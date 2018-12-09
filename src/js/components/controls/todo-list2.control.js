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



import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = ({ filteredTodos, actions }) => (
  <ul className="todo-list">
    {filteredTodos.map(todo =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
)

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired
}

export default TodoList;

/*
import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import TodoList from './TodoList'
import TodoItem from './TodoItem'

const setup = () => {
  const props = {
    filteredTodos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
    actions: {
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      completeTodo: jest.fn(),
      completeAll: jest.fn(),
      clearCompleted: jest.fn()
    }
  }

  const renderer = createRenderer();
  renderer.render(<TodoList {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output
  }
}

describe('components', () => {
  describe('TodoList', () => {
    it('should render container', () => {
      const { output } = setup()
      expect(output.type).toBe('ul')
      expect(output.props.className).toBe('todo-list')
    })

    it('should render todos', () => {
      const { output, props } = setup()
      expect(output.props.children.length).toBe(2)
      output.props.children.forEach((todo, i) => {
        expect(todo.type).toBe(TodoItem)
        expect(Number(todo.key)).toBe(props.filteredTodos[i].id)
        expect(todo.props.todo).toBe(props.filteredTodos[i])
      })
    })
  })
})
*/