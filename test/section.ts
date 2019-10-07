import { mock, restore } from 'simple-mock';
import { atat } from '../src/atat';

describe('Express section tests', () => {
  let fs: any;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with section', async () => {
    mock(fs, 'readFile').callback(
      null,
      '<html>@!(body)@</html>@section(script)@',
    );

    const tmpl = await atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo';</script>}@",
    );
    expect(tmpl()).to.eql(
      "<html> Body <strong>content</strong></html><script>'foo';</script>",
    );
  });

  it('Render template with section and model', async () => {
    mock(fs, 'readFile').callback(
      null,
      '<html>@!(body)@@(it.value)@</html>@section(script)@',
    );

    const tmpl = await atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo@(it.value)@';</script>}@",
    );
    expect(tmpl({ value: '111' })).to.eql(
      "<html> Body <strong>content</strong>111</html><script>'foo111';</script>",
    );
  });
});
