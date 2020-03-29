import { render } from '../src';

describe('@if (...) { ... }@', () => {
  it('should render 1', async () => {
    const result = await render(
      `@if (true) {
        👍
      }@`,
    );
    expect(result).toEqual('👍');
  });

  it('should render empty string', async () => {
    const result = await render(
      `@if (false) {
        👎
      }@`,
    );
    expect(result).toEqual('');
  });

  it('should render 1 by value from model', async () => {
    const result = await render(
      `@if (it.show) {
        👍
      }@`,
      {
        show: true,
      },
    );
    expect(result).toEqual('👍');
  });

  it('should render empty string by value from model', async () => {
    const result = await render(
      `@if (it.show) {
        👎
      }@`,
      {
        show: false,
      },
    );
    expect(result).toEqual('');
  });

  it('should render firstName if ... else if ... else', async () => {
    const result = await render(
      `@if (it.user && it.user.firstName && it.user.secondName) {
        <p>@(it.user.firstName)@</p>
        <p>@(it.user.secondName)@</p>
      } else if (it.user && it.user.firstName) {
        <p>@(it.user.firstName)@</p>
      } else {
        <p>User is not defined</p>
      }@`,
      {
        user: {
          firstName: 'William',
          secondName: '',
        },
      },
    );
    expect(result).toEqual(`<p>William</p>`);
  });
});
