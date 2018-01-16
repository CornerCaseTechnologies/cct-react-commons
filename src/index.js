import {getCookie, setCookie} from './cookies';
import {validateRequiredFields} from './form';
import {getToken, removeToken, storeToken} from './local-storage';
import {buildPaginationUrl} from './url';
import Api from './api';
import routerUtils from './router-utils';
import formSagaUtils from './redux-form-sagas';

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

export {
    Cookies,
    Form,
    LocalStorage,
    API,
    RouterUtils,
    ReduxFormSagaUtils,
    URL
};
