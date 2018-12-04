'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import { increment, decrement } from 'actions/counter.action';
import Counter from 'components/controls/counter.control';
import type { CounterState, CounterProps, DispatchProps } from 'types/counter.type';//Dispatch

const mapStateToProps = (state: CounterState): CounterProps => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	router: state.router,
	count: state.count
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onIncrement: () => dispatch(increment()),
	onDecrement: () => dispatch(decrement())
});

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

/*const ImageContainer = connect((state: ImageState): ImageState => {
	return state;
})(ImageWidget);*/

export default CounterContainer;