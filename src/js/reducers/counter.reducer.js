/**
 * Module dependencies
 */
import { RESET, INCREMENT, DECREMENT } from 'constants/counter.constant';
import type { CounterState, CounterAction } from 'types/counter.type';

const initialState: CounterState = {
	count: 0
};

const CounterReducer = (state: CounterState = initialState, action: CounterAction = {}): CounterState => {
	switch (action.type) {
		case RESET:
			return {
				count: initialState
			};
		case INCREMENT:
			return {
				count: state.count + 1
			};
		case DECREMENT:
			return {
				count: state.count - 1
			};
		default:
			(action: empty);
			return state;
	}
}

export default CounterReducer;