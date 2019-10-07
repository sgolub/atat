import { mock, restore } from 'simple-mock';
import { atat } from '../src/atat';

describe('Express partials tests', () => {
  let fs: any;

  beforeEach(() => {
    fs = require('fs');
  });

  afterEach(() => {
    restore(fs, 'readFile');
  });

  it('Render template with partial', async () => {
    mock(fs, 'readFile').callback(null, '<div>Partial view</div>');

    const tmpl = await atat.parse(
      'Body <strong>content</strong> @partial(./path/partial)@',
    );
    expect(tmpl()).to.eql(
      'Body <strong>content</strong> <div>Partial view</div>',
    );
  });

  it('Render template with partial and model', async () => {
    mock(fs, 'readFile').callback(null, '<div>Partial view @(it.value)@</div>');

    const tmpl = await atat.parse(
      'Body @(it.value)@ <strong>content</strong> @partial(./path/partial, it)@',
    );
    expect(tmpl({ value: 'foo' })).to.eql(
      'Body foo <strong>content</strong> <div>Partial view foo</div>',
    );
  });
});
