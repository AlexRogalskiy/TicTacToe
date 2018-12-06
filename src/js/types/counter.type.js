'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';

/* @flow */
export type Dispatch = (action: CounterAction | Promise<CounterAction>) => Promise;

export type CounterProps = {
	router: RouterState;
	count: number;
};

export type CounterState = {
	count: number;
	router: RouterState;
};

export type CounterAction = {
	type: string;
	currentTime?: number;
};

export type DispatchProps = {
	onReset: () => void;
	onIncrement: () => void;
	onDecrement: () => void;
};