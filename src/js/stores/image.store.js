'use strict';

/**
 * Module dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import fetchImageSaga from 'sagas/image.saga';
import { isFunction } from 'libs/helpers.lib';
import ImageReducer from 'reducers/image.reducer';

const promiseMiddleware = store => next => action =>
	typeof isFunction(action.then)
		? Promise.resolve(action).then(next)
		: Promise.resolve(next(action));

const sagaMiddleware = createSagaMiddleware();
//const ImageStore = createStore(ImageReducer, applyMiddleware(thunk.withExtraArgument({ api, whatever })));
//const ImageStore = createStore(ImageReducer, applyMiddleware(logger, thunk));
/*function fetchUser(id) {
  return (dispatch, getState, { api, whatever }) => {
    // you can use api and something else here
  }
}*/
//const createImageStore = applyMiddleware(promiseMiddleware, logger, thunk)(createStore);
const createImageStore = applyMiddleware(promiseMiddleware, logger, sagaMiddleware)(createStore);
const ImageStore = createImageStore(ImageReducer);

sagaMiddleware.run(fetchImageSaga);

// Even without middleware, you can dispatch an action:
//store.dispatch(withdrawMoney(100));
/*store.dispatch(
  makeASandwichWithSecretSauce('My wife')
).then(() => {
  console.log('Done!');
});*/

/*function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    if (!getState().sandwiches.isShopOpen) {

      // You don’t have to return Promises, but it’s a handy convention
      // so the caller can always call .then() on async dispatch result.

      return Promise.resolve();
    }

    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.

    return dispatch(
      makeASandwichWithSecretSauce('My Grandma')
    ).then(() =>
      Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('My wife'))
      ])
    ).then(() =>
      dispatch(makeASandwichWithSecretSauce('Our kids'))
    ).then(() =>
      dispatch(getState().myMoney > 42 ?
        withdrawMoney(42) :
        apologize('Me', 'The Sandwich Shop')
      )
    );
  };
}*/
/*store.dispatch(
  makeSandwichesForEverybody()
).then(() =>
  response.send(ReactDOMServer.renderToString(<MyApp store={store} />))
);*/

export default ImageStore;


