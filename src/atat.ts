import { compile } from './compiler';
import { AtatContext } from './context';
import { DEFAULT_LOADER } from './loaders';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { IAtatTemplate } from './types';

/**
 * Setup global options.
 * @param {IAtatOptions} options - The options object.
 */
export function config(options: IAtatOptions): void {
  Object.assign(DEFAULT_OPTIONS, options);
}

/**
 * Creates a compiled template function.
 * @param {string} input - The template string.
 * @param {IAtatOptions} options - The options object.
 * @return {Promise<IAtatTemplate>} Promise object represents the compiled template function.
 */
export async function parse(
  input: string,
  options: IAtatOptions = {},
): Promise<IAtatTemplate> {
  const ctx = new AtatContext(options);

  const output = await compile(input, ctx);

  const result = new Function(
    `${ctx.options.it}, ${ctx.options.$}, body`,
    `${output}\nreturn this.output;`,
  );

  const template = (model: any) => {
    ctx.output = '';
    let body = result.call(ctx, model, ctx.helpers, ctx.body);

    if (ctx.layout) {
      ctx.layout.context.body = body;
      return ctx.layout(model);
    }

    return body;
  };

  template.context = ctx;

  return template;
}

/**
 * Load template and creates a compiled template function.
 * @param {string} path The template path.
 * @param {IAtatOptions} options - The options object.
 * @return {Promise<IAtatTemplate>} Promise object represents the compiled template function.
 */
export async function loadAndParse(
  path: string,
  options: IAtatOptions = {},
): Promise<IAtatTemplate> {
  let loader = options.loader || DEFAULT_OPTIONS.loader;

  if (!loader) {
    loader = DEFAULT_LOADER;
    options.loader = loader;
  }

  const content = await loader(path);
  const template = await parse(content, options);

  return template;
}

/**
 * Render the result string.
 * @param {string} input - The template string.
 * @param {*} model The model object.
 * @param {IAtatOptions} options - The options object.
 * @return {Promise<string>} Promise object represents the rendered string.
 */
export async function render(
  input: string,
  model: any = {},
  options: IAtatOptions = {},
): Promise<string> {
  const template = await parse(input, options);
  return template(model);
}

/**
 * Load a template and render the result string.
 * @param {string} path The template path.
 * @param {*} model The model object.
 * @param {IAtatOptions} options - The options object.
 * @return {Promise<string>} Promise object represents the rendered string.
 */
export async function loadAndRender(
  path: string,
  model: any,
  options: IAtatOptions = {},
): Promise<string> {
  const template = await loadAndParse(path, options);
  return template(model);
}
