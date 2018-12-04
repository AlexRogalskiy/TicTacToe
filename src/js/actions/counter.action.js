'use strict';

/**
 * Module dependencies
 */
import { INCREMENT, DECREMENT } from 'constants/counter.constant';
import type { CounterAction } from 'types/counter.type';

export const increment = (): CounterAction => ({
	type: INCREMENT
});

export const decrement = (): CounterAction => ({
	type: DECREMENT
});
