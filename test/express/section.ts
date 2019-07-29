import { mock, restore } from 'simple-mock';
import { atat } from '../../src/atat';

describe('Express section tests', () => {
  let fs;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with section', done => {
    mock(fs, 'readFile').callback(
      null,
      '<html>@!(body)@</html>@section(script)@',
    );

    atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo';</script>}@",
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl()).to.eql(
          "<html> Body <strong>content</strong></html><script>'foo';</script>",
        );

        done();
      },
    );
  });

  it('Render template with section and model', done => {
    mock(fs, 'readFile').callback(
      null,
      '<html>@!(body)@@(it.value)@</html>@section(script)@',
    );

    atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo@(it.value)@';</script>}@",
      (err, tmpl) => {
        expect(err).to.eql(null);
        expect(tmpl({ value: '111' })).to.eql(
          "<html> Body <strong>content</strong>111</html><script>'foo111';</script>",
        );

        done();
      },
    );
  });
});
