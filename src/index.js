import {getCookie, setCookie} from './cookies';
import {validateRequiredFields} from './form';
import {getToken, removeToken, storeToken} from './local-storage';
import {buildPaginationUrl} from './url';
import Api from './api';
import routerUtils from './router-utils';
import reducers from './reducers';
import {generateTypes} from './types';
import ReduxSagaFormUtils from './redux-form-sagas';
import CommonSagaUtils from 'common-sagas';
import {bindActionToPromise} from './utils';

const Cookies = {
    getCookie,
    setCookie
};

const Form = {
    validateRequiredFields
};

const LocalStorage = {
    storeToken,
    getToken,
    removeToken
};

const URL = {
    buildPaginationUrl
};
const Utils = {
    bindActionToPromise
};

const API = Api;
const RouterUtils = routerUtils;
const Reducers = reducers;
const Types = {
    generateTypes
};
export {
    Cookies,
    Form,
    LocalStorage,
    API,
    RouterUtils,
    URL,
    Reducers,
    Types,
    ReduxSagaFormUtils,
    CommonSagaUtils,
    Utils
};
