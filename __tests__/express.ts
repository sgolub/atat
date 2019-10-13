import { __express } from '../src';

describe('__express', () => {
  let fs: any;

  beforeEach(() => {
    jest.mock('fs');
    fs = require('fs');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render template through __express function', done => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '12345@(it.value)@'),
    );

    __express('/path/', { value: '67890' }, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual('1234567890');
      done();
    });
  });

  it('should not render template through __express function', done => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string | null) => void,
      ) => callback(new Error(), null),
    );

    __express('/path/', { value: '67890' }, (err, result) => {
      expect(err).not.toBeNull();
      done();
    });
  });
});
