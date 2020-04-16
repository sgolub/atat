import { render } from '../src';

describe('@layout(...)@', () => {
  let fs: any;

  beforeEach(() => {
    jest.mock('fs');
    fs = require('fs');
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render template with layout', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '<html>@!(body)@</html>'),
    );

    const result = await render(
      '@layout(./path/layout)@ Body <strong>content</strong>',
    );
    expect(result).toEqual('<html> Body <strong>content</strong></html>');
  });

  it('should ignore the second layout and render template with the first one', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => {
        callback(null, '<html>@!(body)@</html>');
      },
    );

    try {
      await render(
        '@layout(./path/layout1)@@layout(./path/layout2)@ Body <strong>content</strong>',
      );
    } catch (err) {
      expect(err.toString()).toEqual('Error: Layout is already specified');
    }
  });

  it('should render template with layout and model', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '<html>@!(body)@@(it.value)@</html>'),
    );

    const result = await render(
      '@layout(./path/layout)@ Body @(it.value)@<strong>content</strong>',
      { value: 'foo' },
    );
    expect(result).toEqual('<html> Body foo<strong>content</strong>foo</html>');
  });

  it('should render template with layout and custom helpers', async () => {
    fs.readFile = jest.fn(
      (
        path: string,
        encoding: string,
        callback: (err: Error | null, text: string) => void,
      ) => callback(null, '<html>@custom(it)@</html>'),
    );

    const result = await render(
      '@layout(./path/layout)@',
      {},
      {
        helpers: {
          custom: function() {
            return 'custom helper result';
          },
        },
      },
    );
    expect(result).toEqual('<html>custom helper result</html>');
  });
});
