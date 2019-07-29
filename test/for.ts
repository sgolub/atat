import { atat } from '../src/atat';

describe('For block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple loop', done => {
    template = '@for (var i = 0; i < 3; i++){Hello }@world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello Hello Hello world!');

      done();
    });
  });

  it('Loop inside of loop', done => {
    template =
      '@for (var i = 0; i < 3; i++){@for(var j = 0; j < 3; j++) {Hello }@}@world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql(
        'Hello Hello Hello Hello Hello Hello Hello Hello Hello world!',
      );

      done();
    });
  });
});
