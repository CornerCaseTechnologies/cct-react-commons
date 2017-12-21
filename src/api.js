import fetch from 'isomorphic-fetch';
import {Promise} from 'es6-promise';

function Api(addHeaderFunc) {

  this.addHeaders = addHeaderFunc;

  this.callApi = (url, options, isFile) => {
    let opt = this.addHeaders(options);

    return fetch(url, opt).then((response) => {
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.indexOf('application/json') >= 0;

      if (response.status >= 200 && response.status < 300) {
        return isJson ? Promise.resolve(
          response.json()) : isFile ? Promise.resolve(response.blob()) : Promise.resolve(response.text()
        );
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
  };

  this.callGet = (url) => {
    return this.callApi(url, {
      method: 'GET'
    });
  };

  this.callPost = (url, data) => {
    return this.callApi(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  this.callUpdate = (url, data) => {
    return this.callApi(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  };

  this.callDelete = (url) => {
    return this.callApi(url, {
      method: 'DELETE'
    });
  };

  this.postFormData = (url, data) => {
    return this.callApi(url, {
      method: 'POST',
      body: data
    });
  };

  this.openFile = (url) => {
    return this.callApi(url, {
      method: 'GET'
    }, true);
  }
}

export default Api;

