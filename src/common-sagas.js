import ReduxSagaFormUtils from './redux-form-sagas';
import {put, call} from 'redux-saga/effects';

export default function CommonSagasUtils(api) {
    this.reduxSagaUtils = new ReduxSagaFormUtils(api);

    this.handleFormAction = function* (url, action, actionType, submitAction) {
        try {
            const result = yield submitAction(url, action);
            yield put({type: actionType.SUCCESS, payload: result});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    };

    this.handleFormSubmit = function* (url, action, actionType) {
        yield this.handleFormAction(url, action, actionType, this.reduxSagaUtils.handleFormSubmit);
    };

    this.handleFormUpdate = function* (url, action, actionType) {
        yield this.handleFormAction(url, action, actionType, this.reduxSagaUtils.handleFormUpdate);
    };

    this.fetchItemSaga = function* (url, actionType) {
        try {
            const result = yield call(api.callGet, url);
            yield put({type: actionType.SUCCESS, payload: result});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    };

    this.removeItemSaga = function* (url, data, actionType) {
        try {
            yield call(api.callDelete, url);
            yield put({type: actionType.SUCCESS, payload: data});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    };

    this.updateItemSaga = function* (url, data, actionType) {
        try {
            yield call(api.callUpdate, url);
            yield put({type: actionType.SUCCESS, payload: data});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    };


    this.callItemPutSaga = function* (url, data, actionType) {
        try {
            const result = yield call(api.callUpdate, url);
            yield put({type: actionType.SUCCESS, payload: result});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e, initialActionData: data});
        }
    }
}
