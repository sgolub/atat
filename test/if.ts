import { atat } from '../src/atat';

describe('If block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple expretion TRUE', done => {
    template = '@if ( true ) {Hello}@ world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello world!');

      done();
    });
  });

  it('Simple expretion FALSE', done => {
    template = '@if ( false ) {Hello}@ world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql(' world!');

      done();
    });
  });

  it('Model expretion TRUE', done => {
    template = '@if ( it.show ) {Hello}@ world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl({ show: true })).to.eql('Hello world!');

      done();
    });
  });

  it('Model expretion TRUE', done => {
    template = '@if ( it.show ) {Hello}@ world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl({ show: false })).to.eql(' world!');

      done();
    });
  });
});
