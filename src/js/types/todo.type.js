'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import type { VisibilityFilterState } from 'types/visibility-filter.type';

/* @flow */
//export type Dispatch = (action: TodoAction | Promise<TodoAction>) => Promise;
export type ReduxInitAction = { type: '@@INIT' };

export type TodoFilterState = TodoState & VisibilityFilterState;

export type TodoItemState = {
	id?: string;
	text?: string;
	completed?: boolean;
};

export type TodoItem = {
	id?: string;
	text?: string;
	completed?: boolean;
};

export type TodoList = Array<TodoItem>;

export type TodoProps = {
	list: TodoList;
	canUndo?: boolean;
	canRedo?: boolean;
	router: RouterState;
};

export type TodoState = {
	+list: TodoList;
	router: RouterState;
};

export type TodoAction = ReduxInitAction | {
	type: string;
	id?: string;
	text?: string;
	completed?: boolean;
};

export type DispatchProps = {
	onReset:  () => void;
	onAdd:    () => void;
	onRemove: () => void;
	onToggle: () => void;
	onUndo?:  () => void;
	onRedo?:  () => void;
};

export type Store = ReduxStore<TodoFilterState, TodoAction>;

export type Dispatch = ReduxDispatch<TodoAction>;