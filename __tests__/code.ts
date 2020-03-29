import { render } from '../src';

describe('Code block', () => {
  it('should render template with empty code block', async () => {
    const text = 'Praesent gravida sagittis urna, nec.';
    const result = await render(
      `@{
        // JavaScript code
      }@
      ${text}`,
    );
    expect(result).toEqual(text);
  });

  it('should render template with non empty block', async () => {
    const text = 'Praesent gravida sagittis urna, nec.';
    const result = await render(
      `@{
        var value = '12345';
      }@
      ${text}@(value)@`,
    );
    expect(result).toEqual(`${text}12345`);
  });
});
