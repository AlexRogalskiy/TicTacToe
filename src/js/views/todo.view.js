import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
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
	<UndoRedo />
  </div>
);

export default App;
/*
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
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
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
*/