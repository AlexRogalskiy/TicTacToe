'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';

/* @flow */
export type Dispatch = (action: FilterAction | Promise<FilterAction>) => Promise;

export type FilterProps = {
	show: boolean;
	router: RouterState;
};

export type FilterState = {
	show: boolean;
	router: RouterState;
};

export type FilterAction = {
	type: string;
	show: boolean;
};

export type DispatchProps = {
	onReset: () => void;
	onShow:  () => void;
	onHide:  () => void;
};