import { render } from '../src';

describe('@partial(...)@', () => {
  let fs: any;

  beforeEach(() => {
    jest.mock('fs');
    fs = require('fs');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render template with partial', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '<div>Partial view</div>'),
    );

    const result = await render(
      'Body <strong>content</strong> @partial(./path/partial)@',
    );
    expect(result).toEqual(
      'Body <strong>content</strong> <div>Partial view</div>',
    );
  });

  it('should render template with partial and model', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '<div>Partial view @(it.value)@</div>'),
    );

    const result = await render(
      'Body @(it.value)@ <strong>content</strong> @partial(./path/partial, it)@',
      { value: 'foo' },
    );
    expect(result).toEqual(
      'Body foo <strong>content</strong> <div>Partial view foo</div>',
    );
  });
});
