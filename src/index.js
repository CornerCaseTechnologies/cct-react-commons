import {getCookie, setCookie} from './cookies';
import {validateRequiredFields} from './form';
import {storeToken, getToken, removeToken} from './local-storage';
import Api from './api';
import routerUtils from './router-utils';
import formUtils from './redux-form';


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

const API = Api;
const RouterUtils = routerUtils;
const ReduxFormUtils = formUtils;

export {
  Cookies,
  Form,
  LocalStorage,
  API,
  RouterUtils,
  ReduxFormUtils
};
