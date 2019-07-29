import { atat } from '../src/atat';

describe('Function block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple function', done => {
    template = "@function hello(){return 'Hello';}@@(hello())@ world!";

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello world!');

      done();
    });
  });
});
