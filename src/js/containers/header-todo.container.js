import { connect } from 'react-redux'
import HeaderTodoControl from '../components/controls/header-todo.control'
import { addTodo } from '../actions'

const HeaderTodoContainer = connect(null, { addTodo })(HeaderTodoControl);

export default HeaderTodoContainer;
