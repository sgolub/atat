import { atat } from '../src/atat';

describe('Simple templates', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Empty template', done => {
    template = '';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl()).to.eql('');

      done();
    });
  });

  it('Inline value', done => {
    template = 'Hello @(it.name)@!';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl({ name: 'world' })).to.eql('Hello world!');

      done();
    });
  });

  it('Inline raw html', done => {
    template = 'Hello @!(it.name)@!';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
        'Hello <strong>world</strong>!',
      );

      done();
    });
  });

  it('Inline encode html', done => {
    template = 'Hello @(it.name)@!';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
        'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
      );

      done();
    });
  });

  it('Inline encode html with custom helpers name', done => {
    template = 'Hello @(it.name)@!';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
        'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
      );

      done();
    });
  });

  it('Inline encode helper', done => {
    template = 'Hello @encode(it.name)@!';

    atat.parse(template, (err, tmpl) => {
      expect(err).to.be(null);
      expect(tmpl({ name: '<strong>world</strong>' })).to.eql(
        'Hello &#60;strong&#62;world&#60;&#47;strong&#62;!',
      );

      done();
    });
  });
});
