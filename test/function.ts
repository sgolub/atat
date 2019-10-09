import * as atat from '../src';

describe('Function block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple function', async () => {
    template = "@function hello(){return 'Hello';}@@(hello())@ world!";

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('Hello world!');
  });
});
