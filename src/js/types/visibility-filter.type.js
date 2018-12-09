'use strict';

/**
 * Module dependencies
 */
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import { VISIBILITY_FILTER } from 'constants/visibility-filter.constant';
/* @flow */
//export type Dispatch = (action: VisibilityFilterAction | Promise<VisibilityFilterAction>) => Promise;
export type ReduxInitAction = { type: '@@INIT' };

export type VisibilityFilterData = VISIBILITY_FILTER.SHOW_ALL | VISIBILITY_FILTER.SHOW_COMPLETED | VISIBILITY_FILTER.SHOW_ACTIVE;

export type VisibilityFilterProps = {
	active: boolean;
};

export type VisibilityFilterState = {
	+filter: VisibilityFilterData;
};

export type VisibilityFilterAction = ReduxInitAction | {
	type: string;
	filter?: VisibilityFilterData;
};

export type DispatchProps = {
	onSetFilter:    (data: VisibilityFilterData) => void;
	onResetFilter:  () => void;
};

export type Store = ReduxStore<VisibilityFilterState, VisibilityFilterAction>;

export type Dispatch = ReduxDispatch<VisibilityFilterAction>;