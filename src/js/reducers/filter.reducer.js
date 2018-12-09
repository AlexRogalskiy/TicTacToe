'use strict';

/**
 * Module dependencies
 */
import { SHOW, HIDE, RESET } from 'constants/filter.constant';
import type { FilrerState, FilterAction } from 'types/filter.type';

const initialState: FilrerState = {
	show: false
};

const FilterReducer = (state: FilrerState = initialState, action: FilterAction = {}): FilrerState => {
  switch (action.type) {
    case SHOW: 
      return { action.show };
    case HIDE:
      return { action.show };
    case RESET:
      return initialState;
    default:
	  (action: empty);
      return state;
  }
};

export default FilterReducer;