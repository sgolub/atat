import * as atat from '../src';

describe('Helpers', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('join', async () => {
    template = '@join(it.collection, " - ")@';

    const result = await atat.render(template, { collection: [1, 2, 3] });
    expect(result).to.eql('1 - 2 - 3');
  });

  it('json', async () => {
    template = '@json(it.obj)@';

    const result = await atat.render(template, { obj: { foo: 'bar' } });
    expect(result).to.eql('{"foo":"bar"}');
  });

  it('upper', async () => {
    template = '@upper("Hello world!")@';

    const result = await atat.render(template);
    expect(result).to.eql('HELLO WORLD!');
  });

  it('lower', async () => {
    template = '@lower("Hello world!")@';

    const result = await atat.render(template, { obj: { foo: 'bar' } });
    expect(result).to.eql('hello world!');
  });

  it('encode', async () => {
    template = '@encode(it.html)@';

    const result = await atat.render(template, {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).to.eql(
      '&#60;script&#62;alert(&#34;Hello!&#34;);&#60;&#47;script&#62;',
    );
  });

  it('encode 2', async () => {
    template = '@(it.html)@';

    const result = await atat.render(template, {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).to.eql(
      '&#60;script&#62;alert(&#34;Hello!&#34;);&#60;&#47;script&#62;',
    );
  });

  it('no encode', async () => {
    template = '@!(it.html)@';

    const result = await atat.render(template, {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).to.eql('<script>alert("Hello!");</script>');
  });
});
