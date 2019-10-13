import { render } from '../src';

describe('@...(...)@', () => {
  it('@join(...)@', async () => {
    const result = await render('@join(it.array, " - ")@', {
      array: [1, 2, 3],
    });
    expect(result).toEqual('1 - 2 - 3');
  });

  it('@join(...)@ without separator', async () => {
    const result = await render('@join(it.array)@', {
      array: [1, 2, 3],
    });
    expect(result).toEqual('123');
  });

  it('@json(...)@', async () => {
    const result = await render('@json(it.obj)@', { obj: { foo: 'bar' } });
    expect(result).toEqual('{"foo":"bar"}');
  });

  it('@upper(...)@', async () => {
    const result = await render('@upper("abc")@');
    expect(result).toEqual('ABC');
  });

  it('@lower(...)@', async () => {
    const result = await render('@lower("aBC")@');
    expect(result).toEqual('abc');
  });

  it('@encode(...)@', async () => {
    const result = await render('@encode(it.html)@', {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).toEqual(
      '&#60;script&#62;alert(&#34;Hello!&#34;);&#60;&#47;script&#62;',
    );
  });

  it('@(...)@', async () => {
    const result = await render('@(it.html)@', {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).toEqual(
      '&#60;script&#62;alert(&#34;Hello!&#34;);&#60;&#47;script&#62;',
    );
  });

  it('@!(...)@', async () => {
    const result = await render('@!(it.html)@', {
      html: '<script>alert("Hello!");</script>',
    });
    expect(result).toEqual('<script>alert("Hello!");</script>');
  });
});
