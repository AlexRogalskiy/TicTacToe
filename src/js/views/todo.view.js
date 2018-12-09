import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer';
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
	<p>
		Show:
		{" "}
		<FilterLink filter="SHOW_ALL">
		  All
		</FilterLink>
		{", "}
		<FilterLink filter="SHOW_ACTIVE">
		  Active
		</FilterLink>
		{", "}
		<FilterLink filter="SHOW_COMPLETED">
		  Completed
		</FilterLink>
	</p>
	<Footer />
	<UndoRedo />
  </div>
);

export default App;

/*
// @flow

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from './App';

const setup = (setupProps = {}) => {
  const store = configureStore()();
  const wrapper = shallow(<App store={store} />);

  return {
    store,
    wrapper
  };
};

describe('App', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
*/