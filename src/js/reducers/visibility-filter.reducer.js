'use strict';

/**
 * Module dependencies
 */
import { SET_VISIBILITY_FILTER, RESET_VISIBILITY_FILTER, VISIBILITY_FILTERS } from 'constants/visibility-filter.constant';
import type { VisibilityFilterState, VisibilityFilterAction } from 'types/visibility-filter.type';

const initialState: VisibilityFilterState = {
	filter: VISIBILITY_FILTERS.SHOW_ALL;
};

const VisibilityFilterReducer = (state: VisibilityFilterState = initialState, action: VisibilityFilterAction = {}): VisibilityFilterState => {
	switch (action.type) {
		case SET_VISIBILITY_FILTER: 
		  return { action.filter };
		case RESET_VISIBILITY_FILTER:
		  return initialState;
		default:
		  (action: empty);
		  return state;
	}
};

export default VisibilityFilterReducer;