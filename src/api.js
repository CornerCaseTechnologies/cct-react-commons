import fetch from 'isomorphic-fetch';
import {Promise} from 'es6-promise';

class Api {

  AddHeaders = null;

  constructor(addHeaderFunc) {
    this.AddHeaders = addHeaderFunc;
  }

  callApi(url, options, isFile) {
    let opt = this.AddHeaders(options);
    return fetch(url, opt).then((response) => {

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.indexOf('application/json') >= 0;

      if (response.status >= 200 && response.status < 300) {
        return isJson ? Promise.resolve(response.json()) : isFile ? Promise.resolve(response.blob()) : Promise.resolve(response.text());
      }

      const error = new Error(response.statusText || response.status);
      if (isJson) {
        return response.json().then((json) => {
          error.response = json;
          error.status = response.status;
          throw error;
        });
      }

      error.response = {message: 'Unexpected Error'};
      error.status = response.status;
      throw error;
    });
  }

  callGet(url) {
    return callApi(url, {
      method: 'GET'
    });
  }

  callPost(url, data) {
    return callApi(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  callUpdate(url, data) {
    return callApi(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  callDelete(url) {
    return callApi(url, {
      method: 'DELETE',
    });
  }

  postFormData(url, data) {
    return callApi(url, {
      method: 'POST',
      body: data
    });
  }

  openFile(url) {
    return callApi(url, {
      method: 'GET',
    }, true);
  }
}

export default Api;

