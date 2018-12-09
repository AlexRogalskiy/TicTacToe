'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setVisibilityFilter, resetVisibilityFilter } from 'actions/visibility-filter.action';
import VisibilityFilterControl from 'components/controls/visibility-filter.control';
import type { VisibilityFilterState, VisibilityFilterProps, DispatchProps } from 'types/visibility-filter.type';//Dispatch

type Props = {
	filter?: VisibilityFilterData;
};

const mapStateToProps = (state: VisibilityFilterState, props: Props): VisibilityFilterProps => ({
	active: state.filter === props.filter
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onSetFilter: (filter: VisibilityFilterData) => dispatch(setVisibilityFilter(filter)),
	onResetFilter: () => dispatch(resetVisibilityFilter())
});

const VisibilityFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityFilterControl);

export default VisibilityFilterContainer;