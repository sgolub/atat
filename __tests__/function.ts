import { render } from '../src';

describe('@function (...) { ... }@', () => {
  it('should render function result', async () => {
    const result = await render(
      `@function sum(first, second) {
        return first + second;
      }@@(sum(1, 2))@`,
    );
    expect(result).toEqual('3');
  });
});
