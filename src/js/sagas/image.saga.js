'use strict';

/**
 * Module dependencies
 */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'; 
import { push } from 'connected-react-router';
import {
  requestImage,
  requestImageSuccess,
  requestImageError
} from 'actions/image.action';
import { FETCHED_IMAGE } from 'constants/image.constant';
//import Api from '...';
import type { ImageAction } from 'types/image.type';

//dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
//function* fetchUser(action) {
//   try {
//      const user = yield call(Api.fetchUser, action.payload.userId);
//      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//   } catch (e) {
//      yield put({type: "USER_FETCH_FAILED", message: e.message});
//   }
//};

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
//function* mySaga() {
//  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
//}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
//function* mySaga() {
//  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
//}
const fetchImage = (url: string): any => {
	return fetch(url).then(res => res.json());
};

function* fetchImageSaga(): void {
	yield takeEvery(FETCHED_IMAGE, fetchImageAsync);
	//yield takeLatest(FETCHED_IMAGE, fetchImageAsync);
	//yield put(push('/home'));
};

function* fetchImageAsync(action: ImageAction): void {
	try {
		yield put(requestImage());
		const data = yield call(fetchImage, action.url);//action.payload.userId
		yield put(requestImageSuccess(data));
	} catch (error) {
		yield put(requestImageError());
	}
};

export default fetchImageSaga;