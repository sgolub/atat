import { AtatLoader, config, FETCH_LOADER, render } from '../src';

describe('Simple tests', () => {
  it('should render empty string', async () => {
    const result = await render('');
    expect(result).toEqual('');
  });

  it('should cause an unbalanced delimiter error', async () => {
    try {
      await render('@(it.value}@@');
    } catch (err: any) {
      expect(err.toString()).toBe(
        'SyntaxError: Unbalanced delimiter "}@" was found in the template\n@(it.value}@@\n          ^^',
      );
    }
  });

  it('should cause a JS error', async () => {
    try {
      await render('@{ it.foo(); }@');
    } catch (err: any) {
      expect(err.toString()).toBe('TypeError: it.foo is not a function');
    }
  });

  it('should ignore empty blocks', async () => {
    const result = await render('@for (var i = 0; i < 10; i++) { }@');
    expect(result).toBe('');
  });

  it('should ignore empty inline blocks', async () => {
    const result = await render('@()@@( )@@!()@@!( )@');
    expect(result).toBe('');
  });

  it('should cause an error if helper is not declarated', async () => {
    try {
      await render('@foo(it.value)@');
    } catch (err: any) {
      expect(err.toString()).toBe('Error: Helper "foo" is not declarated');
    }
  });

  describe('Global config', () => {
    beforeEach(() => {
      jest.mock('fs');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should apply global config', async () => {
      config({
        it: 'that',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loader: jest.fn((path: string) => Promise.resolve('<p>partial</p>')),
      });
      const result = await render('@(that.foo)@@partial(/foo)@', {
        foo: 'bar',
      });
      expect(result).toBe('bar<p>partial</p>');
    });

    it('should use DefaultFileResolver if not specified one', async () => {
      const fs = require('fs');
      fs.readFile = jest.fn(
        (
          path: string,
          encoding: string,
          callback: (err: Error | null, text: string) => void,
        ) => callback(null, '<p>partial</p>'),
      );

      config({ loader: (null as never) as AtatLoader });
      const result = await render(
        '@partial(/foo)@',
        { foo: 'bar' },
        { loader: (null as never) as AtatLoader },
      );
      expect(result).toBe('<p>partial</p>');
      expect(fs.readFile).toHaveBeenCalledTimes(1);
    });

    it('should apply custom helper', async () => {
      config({
        helpers: {
          plusOne: (input: string) => (Number(input) + 1).toString(),
        },
      });
      const result = await render('@plusOne(1)@');
      expect(result).toBe('2');
    });
  });

  describe('fetch', () => {
    afterEach(() => {
      (global as any).fetch.mockClear();
      delete (global as any).fetch;
    });

    it('should render partial', async () => {
      (global as any).fetch = jest.fn().mockResolvedValue({
        text: () => Promise.resolve('<p>partial @(it)@</p>'),
      });
      const result = await render(
        '@partial("path",it.foo)@',
        { foo: 'bar' },
        {
          it: 'it',
          loader: FETCH_LOADER,
        },
      );
      expect(result).toBe('<p>partial bar</p>');
    });
  });
});
