'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
//import { ConnectedRouter, routerMiddleware } from 'connected-react-router/immutable'
import { logger } from 'redux-logger';
//import Immutable from 'immutable';

import fetchImageSaga from 'sagas/image.saga';
import { isFunction } from 'libs/helpers.lib';
import AppReducer from 'reducers/app.reducer';

const history = createBrowserHistory();
//const initialState = Immutable.Map();
//{
//	basename: '/prefix/'
//});

/*import { createHashHistory } from 'history'
const history = createHashHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
})

import { createMemoryHistory } from 'history'
const history = createMemoryHistory({
  initialEntries: [ '/one', '/two', { pathname: '/three' } ],
  initialIndex: 1
})
*/

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then)
		? Promise.resolve(action).then(next)
		: Promise.resolve(next(action));

const sagaMiddleware = createSagaMiddleware();
//const AppMiddleware = applyMiddleware(routerMiddleware(history), promiseMiddleware, logger);
//const AppStore = createStore(AppReducer(history), initialState, compose(AppMiddleware));

const createAppStore = applyMiddleware(routerMiddleware(history), promiseMiddleware, logger, sagaMiddleware)(createStore);
const AppStore = createAppStore(AppReducer(history));

sagaMiddleware.run(fetchImageSaga);

export default AppStore;