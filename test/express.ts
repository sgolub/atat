import { mock, restore } from 'simple-mock';
import { atat } from '../src/atat';

describe('Express only tests', () => {
  let fs: any;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template', done => {
    mock(fs, 'readFile').callback(null, 'Hello @(it.name)@!');
    atat.__express('/path/', { name: 'world' }, (err, result) => {
      expect(err).to.eql(null);
      expect(result).to.eql('Hello world!');

      done();
    });
  });
});
