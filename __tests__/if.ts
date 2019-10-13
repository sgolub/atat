import { render } from '../src';

describe('@if (...) { ... }@', () => {
  it('should render 1', async () => {
    const result = await render('@if(true){1}@');
    expect(result).toEqual('1');
  });

  it('should render empty string', async () => {
    const result = await render('@if(false){1}@');
    expect(result).toEqual('');
  });

  it('should render 1 by value from model', async () => {
    const result = await render('@if(it.show){1}@', {
      show: true,
    });
    expect(result).toEqual('1');
  });

  it('should render empty string by value from model', async () => {
    const result = await render('@if(it.show){1}@', {
      show: false,
    });
    expect(result).toEqual('');
  });
});
