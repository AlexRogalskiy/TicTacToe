'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

/* @flow */
//export type Dispatch = (action: FilterAction | Promise<FilterAction>) => Promise;
export type ReduxInitAction = { type: '@@INIT' };

export type FilterProps = {
	show: boolean;
	router: RouterState;
};

export type FilterState = {
	show: boolean;
	router: RouterState;
};

export type FilterAction = ReduxInitAction | {
	type: string;
	show?: boolean;
};

export type DispatchProps = {
	onReset: () => void;
	onShow:  () => void;
	onHide:  () => void;
};

export type Store = ReduxStore<FilterState, FilterAction>;

export type Dispatch = ReduxDispatch<FilterAction>;