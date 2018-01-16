import {getCookie, setCookie} from './cookies';
import {validateRequiredFields} from './form';
import {getToken, removeToken, storeToken} from './local-storage';
import {buildPaginationUrl} from './url';
import Api from './api';
import routerUtils from './router-utils';
import formSagaUtils from './redux-form-sagas';
import reducers from './reducers';
import types from './types';

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

const API = Api;
const RouterUtils = routerUtils;
const ReduxFormSagaUtils = formSagaUtils;
const Reducers = reducers;
const Types = types;
export {
    Cookies,
    Form,
    LocalStorage,
    API,
    RouterUtils,
    ReduxFormSagaUtils,
    URL,
    Reducers,
    Types
};
