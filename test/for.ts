import { atat } from '../src/atat';

describe('For block', () => {
  let template = '';

  beforeEach(() => {
    template = '';
  });

  it('Simple loop', async () => {
    template = '@for (var i = 0; i < 3; i++){Hello }@world!';

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql('Hello Hello Hello world!');
  });

  it('Loop inside of loop', async () => {
    template =
      '@for (var i = 0; i < 3; i++){@for(var j = 0; j < 3; j++) {Hello }@}@world!';

    const tmpl = await atat.parse(template);
    expect(tmpl()).to.eql(
      'Hello Hello Hello Hello Hello Hello Hello Hello Hello world!',
    );
  });
});
