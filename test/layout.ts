import { mock, restore } from 'simple-mock';
import { atat } from '../src/atat';

describe('Express layout tests', () => {
  let fs: any;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with layout', async () => {
    mock(fs, 'readFile').callback(null, '<html>@!(body)@</html>');

    const tmpl = await atat.parse(
      '@layout(./path/layout)@ Body <strong>content</strong>',
    );
    expect(tmpl()).to.eql('<html> Body <strong>content</strong></html>');
  });

  it('Render template with layout and model', async () => {
    mock(fs, 'readFile').callback(null, '<html>@!(body)@@(it.value)@</html>');

    const tmpl = await atat.parse(
      '@layout(./path/layout)@ Body @(it.value)@<strong>content</strong>',
    );
    expect(tmpl({ value: 'foo' })).to.eql(
      '<html> Body foo<strong>content</strong>foo</html>',
    );
  });
});
