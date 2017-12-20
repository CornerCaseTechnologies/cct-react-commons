import chai from 'chai';
import {Form} from '../src/index';

chai.expect();

const expect = chai.expect;


describe('Form Utils tests', () => {

  it('should return no array', () => {
    let params = {
      fields: [
        'TestField'
      ],
      values:
        {
          TestField: 100
        }
      ,
      errors: {}
    };
    const result = Form.validateRequiredFields(params.values, params.fields, params.errors);
    expect(result).to.deep.equal({});
  });

  it('should return error array', () => {
    let params = {
      fields: [
        'TestField',
        'ErrorField'
      ],
      values:
        {
          TestField: 100
        }
      ,
      errors: {}
    };
    const result = Form.validateRequiredFields(params.values, params.fields, params.errors);
    expect(result.ErrorField).to.equal('Required field');
  });

});
