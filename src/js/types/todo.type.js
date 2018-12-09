'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';

import { VisibilityFilterState } from 'types/visibility-filter.type';

/* @flow */
export type Dispatch = (action: TodoAction | Promise<TodoAction>) => Promise;

export type TodoFilterState = {
	list: Array<TodoItemState>;
	filter: VisibilityFilterState;
	router: RouterState;
};

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

export type TodoProps = {
	list: Array<TodoItem>;
	canUndo?: boolean;
	canRedo?: boolean;
	router: RouterState;
};

export type TodoState = {
	list: Array<TodoItemState>;
	router: RouterState;
};

export type TodoAction = {
	type: string;
	id: string;
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