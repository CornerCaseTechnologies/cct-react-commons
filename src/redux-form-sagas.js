import {call, put} from 'redux-saga/effects';

function objectToFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (namespace) {
                formKey = namespace + '.' + property;
            } else {
                formKey = property;
            }
            // if the property is an object, but not a File, use recursion.
            if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                objectToFormData(obj[property], fd, property);

            } else {
                // if it's a string or a File object
                fd.append(formKey, obj[property]);
            }
        }
    }
    return fd;
}

const handleFormAction = function* (url, callAction, action, SubmissionError) {
    try {
        const result = yield call(callAction, url, action.payload.data);
        yield call(action.payload.resolve, result);
        return result;
    } catch (e) {
        let error = new SubmissionError(e.response);

        if (e.response.non_field_errors) {
            error = new SubmissionError({_error: e.response.non_field_errors, status: e.status});

        } else if (e.response.message) {
            error = new SubmissionError({_error: e.response.message, status: e.status});

        } else if (e.response.detail) {
            error = new SubmissionError({_error: e.response.detail, status: e.status});

        } else if (e.response[0]) {
            error = new SubmissionError({_error: e.response[0], status: e.status});
        }

        yield call(action.payload.reject, error);
        throw error;
    }
};
const callAction = function* (url, action, actionType, callAction, SubmissionError) {
    try {
        const result = yield handleFormAction(url, callAction, action, SubmissionError);
        yield put({type: actionType.SUCCESS, payload: result, initialPayload: action.payload});
    } catch (e) {
        yield put({type: actionType.FAILURE, payload: e, initialPayload: action.payload});
    }
};
export default class ReduxSagaFormUtils {
    constructor(api, SubmissionError) {
        this.api = api;
        this.SubmissionError = SubmissionError;
    }

    * handleFormSubmit(url, action, actionType) {
        return yield callAction(url, action, actionType, this.api.callPost, this.SubmissionError);
    }

    * handleFormUpdate(url, action, actionType) {
        return yield callAction(url, action, actionType, this.api.callUpdate, this.SubmissionError);
    }

    * handleFormDataSubmit(api, url, action, actionType) {
        action.payload.data = objectToFormData(action.payload.data);
        return yield callAction(url, action, actionType, this.api.postFormData, this.SubmissionError);
    }
}
