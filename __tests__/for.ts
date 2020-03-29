import { render } from '../src';

describe('@for (...) { ... }@', () => {
  it('should render simple for loop', async () => {
    const result = await render(
      `@for (var i = 0; i < 3; i++) {
        🎂
      }@`,
    );
    expect(result).toEqual('🎂🎂🎂');
  });

  it('should render for inside for', async () => {
    const result = await render(
      `@for (var i = 0; i < 3; i++) {
        @for(var j = 0; j < 3; j++) {
          🍕
        }@
      }@`,
    );
    expect(result).toEqual('🍕🍕🍕🍕🍕🍕🍕🍕🍕');
  });
});
