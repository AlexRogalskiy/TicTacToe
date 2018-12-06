'use strict';

/**
 * Module dependencies
 */
import { RESET, INCREMENT, DECREMENT } from 'constants/counter.constant';
import type { CounterAction } from 'types/counter.type';

export const reset = (): CounterAction => ({
	type: RESET
});

export const increment = (): CounterAction => ({
	type: INCREMENT
});

export const decrement = (): CounterAction => ({
	type: DECREMENT
});
