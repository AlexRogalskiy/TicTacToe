'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { isFunction } from 'libs/helpers.lib';
import TodoFilterReducer from 'reducers/todo-filter.reducer';

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then)
		? Promise.resolve(action).then(next)
		: Promise.resolve(next(action));

const createTodoFilterStore = applyMiddleware(promiseMiddleware, logger, thunk)(createStore);
const TodoFilterStore = createTodoFilterStore(TodoFilterReducer);

export default TodoFilterStore;


