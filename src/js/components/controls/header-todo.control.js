'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos';

import type { Dispatch } from '../types';

/* @flow */
export type Props = {
  dispatch: Dispatch
};

export type State = {
  value: string
};

class HeaderTodoControl extends Component<Props, State> {
  input: HTMLInputElement;
  state = {
    value: ''
  };
  handleChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };
  handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }
    this.props.dispatch(addTodo(this.state.value));
    this.setState({ value: '' });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
};


import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

const Header = ({ addTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodo(text)
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
)

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default HeaderTodoControl

/*
// @flow

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import AddTodo from './AddTodo';

const setup = (setupProps = {}) => {
  const store = configureStore()({ todos: [] });
  const wrapper = shallow(<AddTodo store={store} />);

  return {
    store,
    wrapper
  };
};

describe('AddTodo', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('onSubmit calls preventDefault to stop form submit', () => {
    let preventDefault = jest.fn();
    let { wrapper } = setup();
    let form = wrapper.shallow().shallow().find('form');
    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  test('onSubmit returns early if input.value is not set', () => {
    let { store } = setup();
    expect(store.getActions()).toEqual([]);
  });

  test('onSubmit dispatches action if input.value is set', () => {
    const { store, wrapper } = setup();
    let preventDefault = jest.fn();
    const deeperWrapper = wrapper.shallow();

    deeperWrapper
      .find('input')
      .simulate('change', { currentTarget: { value: 'Test todo' } });

    deeperWrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      { id: 0, text: 'Test todo', type: 'ADD_TODO' }
    ]);
  });
});



import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import Header from './Header'
import TodoTextInput from '../components/TodoTextInput'

const setup = () => {
  const props = {
    addTodo: jest.fn()
  }

  const renderer = createRenderer();
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('header')
      expect(output.props.className).toBe('header')

      const [ h1, input ] = output.props.children
      expect(h1.type).toBe('h1')
      expect(h1.props.children).toBe('todos')
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.newTodo).toBe(true)
      expect(input.props.placeholder).toBe('What needs to be done?')
    })

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup()
      const input = output.props.children[1]
      input.props.onSave('')
      expect(props.addTodo).not.toBeCalled()
      input.props.onSave('Use Redux')
      expect(props.addTodo).toBeCalled()
    })
  })
})
*/