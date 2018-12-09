'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { reset, show, hide } from 'actions/filter.action';
import FilterControl from 'components/controls/filter.control';
import type { FilterState, FilterProps, DispatchProps } from 'types/filter.type';//Dispatch

const mapStateToProps = (state: FilterState): FilterProps => ({
	show: state.show
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onActive: (filter: VisibilityFilterData) => dispatch(reset()),
	onReset: () => dispatch(reset()),
	onShow: () => dispatch(show()),
	onHide: () => dispatch(hide())
});

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterControl);

export default FilterContainer;