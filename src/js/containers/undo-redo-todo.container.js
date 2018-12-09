'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
//import { RouteComponentProps } from 'react-router';

import UndoRedoTodoListControl from 'components/controls/undo-redo-todo-list.control';
import type { TodoProps, TodoFilterState, DispatchProps } from 'types/todo.type';//Dispatch

const mapStateToProps = (state: TodoFilterState): TodoProps => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	canUndo: state.list.past.length > 0,
	canRedo: state.list.future.length > 0
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onUndo: UndoActionCreators.undo,
	onRedo: UndoActionCreators.redo
});

const UndoRedoTodoContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UndoRedoTodoListControl);

export default UndoRedoTodoContainer;

/*
let UndoRedoTodoListControl = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
)
*/