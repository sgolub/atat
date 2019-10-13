import { render } from '../src';

describe('@while(...){ ... }@', () => {
  it('should render simple while loop', async () => {
    const result = await render('@{var i = 0;}@@while(i<3){@{i++;}@ 1 }@');
    expect(result).toEqual(' 1  1  1 ');
  });

  it('should render while inside of while', async () => {
    const result = await render(
      '@{var i = 0, j = 0;}@@while(i<3){@{i++;j=0;}@@while(j<2){@{j++;}@ 1 }@}@',
    );
    expect(result).toEqual(' 1  1  1  1  1  1 ');
  });
});
