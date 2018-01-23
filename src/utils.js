import {Promise} from 'es6-promise';

export const bindActionToPromise = (dispatch, actionCreator) => payload => {
    return new Promise((resolve, reject) => dispatch(actionCreator(payload, resolve, reject)));
};

