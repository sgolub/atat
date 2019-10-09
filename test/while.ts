import * as atat from '../src';

describe('While block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple loop', async () => {
    template = '@{var i = 0;}@@while(i<3){@{i++;}@Hello }@world!';

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('Hello Hello Hello world!');
  });

  it('Loop inside of loop', async () => {
    template =
      '@{var i = 0, j = 0;}@@while(i<3){@{i++;j=0;}@@while(j<2){@{j++;}@Hello }@}@world!';

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('Hello Hello Hello Hello Hello Hello world!');
  });
});
