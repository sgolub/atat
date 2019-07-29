import { atat } from '../src/atat';

describe('Code block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Empty code block', done => {
    template = '@{    }@Hello world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello world!');

      done();
    });
  });

  it('New variable inside of code block', done => {
    template = "@{ var name = 'world'; }@Hello @(name)@!";

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello world!');

      done();
    });
  });
});
