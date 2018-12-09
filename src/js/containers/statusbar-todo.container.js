'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import * as TodoActions from 'actions/todo.action';
import StatusbarTodoControl from 'components/controls/statusbar-todo.control';
import { getCompletedTodoItemCountSelector } from 'selectors/todo.selector';
import type { TodoProps, TodoFilterState, DispatchProps } from 'types/todo.type';//Dispatch

const mapStateToProps = (state: TodoFilterState): TodoProps => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	listCount: state.list.length,
	completedCount: getCompletedTodoItemCountSelector(state.list)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	actions: bindActionCreators(TodoActions, dispatch)
});

const StatusbarTodoContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(StatusbarTodoControl);

export default StatusbarTodoContainer;