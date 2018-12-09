'use strict';

/* @flow */
export const SET_VISIBILITY_FILTER: string 		= 'SET_VISIBILITY_FILTER';
export const RESET_VISIBILITY_FILTER: string 	= 'RESET_VISIBILITY_FILTER';

const SHOW_ALL: string 			= 'SHOW_ALL';
const SHOW_COMPLETED: string 	= 'SHOW_COMPLETED';
const SHOW_ACTIVE: string 		= 'SHOW_ACTIVE';

export const VISIBILITY_FILTERS = {
	SHOW_ALL,
	SHOW_COMPLETED,
	SHOW_ACTIVE
};