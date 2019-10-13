import { render } from '../src';

describe('@section ...{ ... }@', () => {
  let fs: any;

  beforeEach(() => {
    jest.mock('fs');
    fs = require('fs');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render template with section', async () => {
    fs.readFile = jest
      .fn()
      .mockImplementation((path, encoding, callback) =>
        callback(null, '<html>@!(body)@</html>@section(script)@'),
      );

    const result = await render(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo';</script>}@",
    );
    expect(result).toEqual(
      "<html> Body <strong>content</strong></html><script>'foo';</script>",
    );
  });

  it('should render template with section and model', async () => {
    fs.readFile = jest
      .fn()
      .mockImplementation((path, encoding, callback) =>
        callback(null, '<html>@!(body)@@(it.value)@</html>@section(script)@'),
      );

    const result = await render(
      '@layout(./path/layout)@ Body <strong>content</strong>' +
        "@section script{<script>'foo@(it.value)@';</script>}@",
      { value: '111' },
    );
    expect(result).toEqual(
      "<html> Body <strong>content</strong>111</html><script>'foo111';</script>",
    );
  });

  it('should not render template with two the same sections', async () => {
    try {
      fs.readFile = jest
        .fn()
        .mockImplementation((path, encoding, callback) =>
          callback(null, '<html>@!(body)@@(it.value)@</html>@section(script)@'),
        );

      await render(
        '@layout(./path/layout)@ Body <strong>content</strong>' +
          '@section script{<script>console.log(@(it.value)@);</script>}@' +
          '@section script{<script>console.log(@(it.value)@);</script>}@',
        { value: '111' },
      );
    } catch (err) {
      expect(err.toString()).toBe(
        'Error: The section "script" is already specified',
      );
    }
  });

  it('should not render template with a section without a name', async () => {
    try {
      fs.readFile = jest
        .fn()
        .mockImplementation((path, encoding, callback) =>
          callback(null, '<html>@!(body)@@(it.value)@</html>@section(script)@'),
        );

      await render(
        '@layout(./path/layout)@ Body <strong>content</strong>' +
          '@section {<script>console.log(@(it.value)@);</script>}@',
        { value: '111' },
      );
    } catch (err) {
      expect(err.toString()).toBe('Error: Section name is not specified');
    }
  });
});
