'use strict';

/* @flow */
export type Dispatch = (action: VisibilityFilterAction | Promise<VisibilityFilterAction>) => Promise;

export type VisibilityFilterData = string;

export type VisibilityFilterProps = {
	active: boolean;
};

export type VisibilityFilterState = {
	filter?: VisibilityFilterData;
};

export type VisibilityFilterAction = {
	type: string;
	filter: VisibilityFilterData;
};

export type DispatchProps = {
	onSetFilter:    (data: VisibilityFilterData) => void;
	onResetFilter:  () => void;
};