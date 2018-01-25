import ReduxSagaFormUtils from './redux-form-sagas';
import {put, call} from 'redux-saga/effects';

class CommonSagasUtils {
    constructor(api) {
        this.reduxSagaUtils = new ReduxSagaFormUtils(api);
    }

    * handleFormAction(url, action, actionType, submitAction) {
        try {
            const result = yield submitAction(url, action);
            yield put({type: actionType.SUCCESS, payload: result});
        } catch (e) {
            yield put({type: actionType.FAILURE, payload: e});
        }
    }

    * handleFormSubmit(url, action, actionType) {
        yield this.handleFormAction(url, action, actionType, this.reduxSagaUtils.handleFormSubmit);
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
