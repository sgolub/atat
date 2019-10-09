import * as atat from '../src';

describe('If block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple expretion TRUE', async () => {
    template = '@if ( true ) {Hello}@ world!';
    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('Hello world!');
  });

  it('Simple expretion FALSE', async () => {
    template = '@if ( false ) {Hello}@ world!';
    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql(' world!');
  });

  it('Model expretion TRUE', async () => {
    template = '@if ( it.show ) {Hello}@ world!';
    const tmpl = await atat.parse(template);
    expect(tmpl({ show: true })).to.eql('Hello world!');
  });

  it('Model expretion TRUE', async () => {
    template = '@if ( it.show ) {Hello}@ world!';
    const tmpl = await atat.parse(template);
    expect(tmpl({ show: false })).to.eql(' world!');
  });
});
