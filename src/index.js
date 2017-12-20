import {getCookie, setCookie} from './cookies';
import {validateRequiredFields} from './form';
import {storeToken, getToken, removeToken} from './local-storage';

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

export {
  Cookies,
  Form,
  LocalStorage
};
