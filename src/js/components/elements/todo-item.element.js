// @flow
import React from 'react';
import PropTypes from 'prop-types'

export type Props = {
  onClick: () => void;
  completed: boolean;
  text: string;
};

const TodoItemControl = ({ onClick, completed, text }: Props) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

export default TodoItemControl;

/*
// @flow

import React from 'react';
import { shallow } from 'enzyme';

import Todo from './Todo';

const setup = (setupProps = {}) => {
  const defaultProps = {
    text: 'Test todo',
    completed: false,
    onClick: jest.fn()
  };
  const props = { ...defaultProps, ...setupProps };
  const wrapper = shallow(
    <Todo
      text={props.text}
      completed={props.completed}
      onClick={props.onClick}
    />
  );

  return {
    props,
    wrapper
  };
};

describe('Todo', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('puts a line through text when completed', () => {
    const { wrapper } = setup({ completed: true });

    expect(wrapper).toMatchSnapshot();
  });

  test('calls onClick when clicked', () => {
    const { props, wrapper } = setup();
    expect(wrapper).toMatchSnapshot();

    wrapper.find('li').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
};


/*
import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'

const setup = ( editing = false ) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn()
  }

  const renderer = createRenderer()

  renderer.render(
    <TodoItem {...props} />
  )

  let output = renderer.getRenderOutput()

  if (editing) {
    const label = output.props.children.props.children[1]
    label.props.onDoubleClick({})
    output = renderer.getRenderOutput()
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { output } = setup()

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('')

      const div = output.props.children

      expect(div.type).toBe('div')
      expect(div.props.className).toBe('view')

      const [ input, label, button ] = div.props.children

      expect(input.type).toBe('input')
      expect(input.props.checked).toBe(false)

      expect(label.type).toBe('label')
      expect(label.props.children).toBe('Use Redux')

      expect(button.type).toBe('button')
      expect(button.props.className).toBe('destroy')
    })

    it('input onChange should call completeTodo', () => {
      const { output, props } = setup()
      const input = output.props.children.props.children[0]
      input.props.onChange({})
      expect(props.completeTodo).toBeCalledWith(0)
    })

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup()
      const button = output.props.children.props.children[2]
      button.props.onClick({})
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup()
      const label = output.props.children.props.children[1]
      label.props.onDoubleClick({})
      const updated = renderer.getRenderOutput()
      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('editing')
    })

    it('edit state render', () => {
      const { output } = setup(true)

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('editing')

      const input = output.props.children
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.text).toBe('Use Redux')
      expect(input.props.editing).toBe(true)
    })

    it('TodoTextInput onSave should call editTodo', () => {
      const { output, props } = setup(true)
      output.props.children.props.onSave('Use Redux')
      expect(props.editTodo).toBeCalledWith(0, 'Use Redux')
    })

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const { output, props } = setup(true)
      output.props.children.props.onSave('')
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('TodoTextInput onSave should exit component from edit state', () => {
      const { output, renderer } = setup(true)
      output.props.children.props.onSave('Use Redux')
      const updated = renderer.getRenderOutput()
      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('')
    })
  })
})
*/