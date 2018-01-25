import {put, call} from 'redux-saga/effects';

export default class CommonSagasUtils {
    constructor(api) {
        this.api = api;
    }

    * fetchItemSaga(url, actionType) {
        try {
            const result = yield call(api.callGet, url);
            yield put({type: actionType.SUCCESS, payload: result});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    }

    * removeItemSaga(url, data, actionType) {
        try {
            yield call(api.callDelete, url);
            yield put({type: actionType.SUCCESS, payload: data});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    }

    * updateItemSaga(url, data, actionType) {
        try {
            yield call(api.callUpdate, url);
            yield put({type: actionType.SUCCESS, payload: data});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    }

}
