import {SubmissionError} from 'redux-form';
import {call} from 'redux-saga/effects';

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

const handleFormAction = function* (url, callAction, action) {
    try {
        const result = yield call(callAction, url, action.payload.data);
        yield call(action.payload.resolve, result);
        return result;
    } catch (e) {
        let error = new SubmissionError(e.response);

        if (e.response.non_field_errors) {
            error = new SubmissionError({_error: e.response.non_field_errors});

        } else if (e.response.message) {
            error = new SubmissionError({_error: e.response.message});

        } else if (e.response.detail) {
            error = new SubmissionError({_error: e.response.detail});

        } else if (e.response[0]) {
            error = new SubmissionError({_error: e.response[0]});
        }
        yield call(action.payload.reject, error);
        throw error;
    }
};

export default function ReduxSagaFormUtils(api) {

    this.handleFormSubmit = function* (url, action) {
        return yield handleFormAction(url, api.callPost, action);
    };

    this.handleFormUpdate = function* (url, action) {
        return yield handleFormAction(url, api.callUpdate, action);
    };

    this.handleFormDataSubmit = function* (url, action) {
        action.payload.data = objectToFormData(action.payload.data);
        return yield handleFormAction(url, api.postFormData, action);
    };


}
