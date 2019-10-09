import * as atat from '../src';

describe('Simple templates', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Empty template', async () => {
    template = '';

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('');
  });

  it('Inline value', async () => {
    template = 'Hello @(it.name)@!';

    const tmpl = await atat.parse(template);
    expect(tmpl({ name: 'world' })).to.eql('Hello world!');
  });

  it('Inline raw html', async () => {
    template = 'Hello @!(it.name)@!';

    const tmpl = await atat.parse(template);
    expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
      'Hello <strong>world</strong>!',
    );
  });

  it('Inline encode html', async () => {
    template = 'Hello @(it.name)@!';

    const tmpl = await atat.parse(template);
    expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
      'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
    );
  });

  it('Inline encode html with custom helpers name', async () => {
    template = 'Hello @(it.name)@!';

    const tmpl = await atat.parse(template);
    expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
      'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
    );
  });

  it('Inline encode helper', async () => {
    template = 'Hello @encode(it.name)@!';

    const tmpl = await atat.parse(template);
    expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
      'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
    );
  });
});
