import * as atat from '../src';

describe('Code block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Empty code block', async () => {
    template = '@{    }@Hello world!';

    const result = await atat.render(template);
    expect(result).to.eql('Hello world!');
  });

  it('New variable inside of code block', async () => {
    template = "@{ var name = 'world'; }@Hello @(name)@!";

    const result = await atat.render(template);
    expect(result).to.eql('Hello world!');
  });
});
