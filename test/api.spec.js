import chai from 'chai';
import {API} from '../src/index';
import nock from 'nock';
import {addHeaders} from './mock-data';

chai.expect();

const expect = chai.expect;


describe('Api tests', () => {

  let api = null;

  before(() => {
    api = new API(addHeaders);
  });

  describe('should send HTTP GET request', () => {

    before(() => {
      const repsonse = {
        message: 'GET_SUCCESS'
      };
      nock('https://api.test.com')
        .get('/test/get')
        .reply(200, repsonse);
    });

    it('should handle HTTP GET success', () => {
      api.callGet('https://api.test.com/test/get').then(function (res) {
        expect(res.message).to.equal('GET_SUCCESS');
      });
    });

  });


  describe('should send HTTP POST request', () => {

    before(() => {
      const repsonse = {
        message: 'POST_SUCCESS'
      };
      nock('https://api.test.com')
        .post('/test/post')
        .reply(200, repsonse);
    });

    it('should handle HTTP POST success', () => {
      api.callPost('https://api.test.com/test/post').then(function (res) {
        expect(res.message).to.equal('POST_SUCCESS');
      });
    });

  });

  describe('should send HTTP PUT request', () => {

    before(() => {
      const repsonse = {
        message: 'UPDATE_SUCCESS'
      };
      nock('https://api.test.com')
        .put('/test/put')
        .reply(200, repsonse);
    });

    it('should handle HTTP PUT success', () => {
      api.callUpdate('https://api.test.com/test/put').then(function (res) {
        expect(res.message).to.equal('UPDATE_SUCCESS');
      });
    });

  });

  describe('should send HTTP DELETE request', () => {

    before(() => {
      const repsonse = {
        message: 'DELETE_SUCCESS'
      };
      nock('https://api.test.com')
        .delete('/test/delete')
        .reply(200, repsonse);
    });

    it('should handle HTTP DELETE success', () => {
      api.callDelete('https://api.test.com/test/delete').then(function (res) {
        expect(res.message).to.equal('DELETE_SUCCESS');
      });
    });

  });



});
