'use strict';

/**
 * Module dependencies
 */
import { SHOW, HIDE, RESET } from 'constants/filter.constant';
import type { FilterAction } from 'types/filter.type';

export const reset = (): FilterAction => ({
	type: RESET,
	show: false
});

export const show = (): FilterAction => ({
	type: SHOW,
	show: true
});

export const hide = (): FilterAction => ({
	type: HIDE,
	show: false
});
