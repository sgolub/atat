import { atat } from '../src/atat';

describe('While block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple loop', done => {
    template = '@{var i = 0;}@@while(i<3){@{i++;}@Hello }@world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello Hello Hello world!');

      done();
    });
  });

  it('Loop inside of loop', done => {
    template =
      '@{var i = 0, j = 0;}@@while(i<3){@{i++;j=0;}@@while(j<2){@{j++;}@Hello }@}@world!';

    atat.parse(template, (err, tmpl) => {
      expect(tmpl()).to.eql('Hello Hello Hello Hello Hello Hello world!');

      done();
    });
  });
});
