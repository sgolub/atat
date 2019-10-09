import * as atat from '../src';

describe('Code block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Empty code block', async () => {
    template = '@{    }@Hello world!';

    const tmpl = await atat.parse(template);

    expect(tmpl).to.be.ok();
    expect(tmpl()).to.eql('Hello world!');
  });

  it('New variable inside of code block', async () => {
    template = "@{ var name = 'world'; }@Hello @(name)@!";

    const tmpl = await atat.parse(template);

    expect(tmpl).to.be.ok();
    expect(tmpl()).to.eql('Hello world!');
  });
});
