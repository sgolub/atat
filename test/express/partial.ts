import { mock, restore } from 'simple-mock';
import { atat } from '../../src/atat';

describe('Express partials tests', () => {
  let fs;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with partial', done => {
    mock(fs, 'readFile').callback(null, '<div>Partial view</div>');

    atat.parse(
      'Body <strong>content</strong> @partial(./path/partial)@',
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl()).to.eql(
          'Body <strong>content</strong> <div>Partial view</div>',
        );

        done();
      },
    );
  });

  it('Render template with partial and model', done => {
    mock(fs, 'readFile').callback(null, '<div>Partial view @(it.value)@</div>');

    atat.parse(
      'Body @(it.value)@ <strong>content</strong> @partial(./path/partial, it)@',
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl({ value: 'foo' })).to.eql(
          'Body foo <strong>content</strong> <div>Partial view foo</div>',
        );

        done();
      },
    );
  });
});
