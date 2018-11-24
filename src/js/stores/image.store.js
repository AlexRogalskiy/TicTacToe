'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import { isFunction } from 'libs/helpers.lib';
import ImageReducer from 'reducers/image.reducer';

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then) ? Promise.resolve(action).then(next) : Promise.resolve(next(action));

//const ImageStore = createStore(ImageReducer, applyMiddleware(logger));

const createImageStore = applyMiddleware(promiseMiddleware, logger)(createStore);
const ImageStore = createImageStore(ImageReducer);

export default ImageStore;
