import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import TicTacToeFlow from '../reducers/flow';

let store = createStore(TicTacToeFlow, applyMiddleware(logger));

export default store;