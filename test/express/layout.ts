import { mock, restore } from 'simple-mock';
import { atat } from '../../src/atat';

describe('Express layout tests', () => {
  let fs;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with layout', done => {
    mock(fs, 'readFile').callback(null, '<html>@!(body)@</html>');

    atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>',
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl()).to.eql('<html> Body <strong>content</strong></html>');

        done();
      },
    );
  });

  it('Render template with layout and model', done => {
    mock(fs, 'readFile').callback(null, '<html>@!(body)@@(it.value)@</html>');

    atat.parse(
      '@layout(./path/layout)@ Body @(it.value)@<strong>content</strong>',
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl({ value: 'foo' })).to.eql(
          '<html> Body foo<strong>content</strong>foo</html>',
        );

        done();
      },
    );
  });
});
