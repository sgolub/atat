import { render } from '../src';

describe('@while(...){ ... }@', () => {
  it('should render simple while loop', async () => {
    const result = await render(
      `@{
        var i = 0;
      }@
      @while (i < 3) {
        @{i++;}@
        🎂
      }@`,
    );
    expect(result).toEqual('🎂🎂🎂');
  });

  it('should render while inside of while', async () => {
    const result = await render(
      `@{
        var i = 0, j = 0;
      }@
      @while(i<3){
        @{ i++; j=0; }@
        @while(j<2){
          @{j++;}@
          🍕
        }@
      }@`,
    );
    expect(result).toEqual('🍕🍕🍕🍕🍕🍕');
  });
});
