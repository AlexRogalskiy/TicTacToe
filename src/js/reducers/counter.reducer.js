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
			return initialState;
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

/*
describe('reducers', () => {
  describe('counter', () => {
    it('should provide the initial state', () => {
      expect(counter(undefined, {})).toBe(0)
    })

    it('should handle INCREMENT action', () => {
      expect(counter(1, { type: 'INCREMENT' })).toBe(2)
    })

    it('should handle DECREMENT action', () => {
      expect(counter(1, { type: 'DECREMENT' })).toBe(0)
    })

    it('should ignore unknown actions', () => {
      expect(counter(1, { type: 'unknown' })).toBe(1)
    })
  })
})
*/