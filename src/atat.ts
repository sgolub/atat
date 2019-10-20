import { compile } from './compiler';
import { AtatContext } from './context';
import { DEFAULT_LOADER } from './loaders';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { IAtatTemplate } from './types';

export function config(opts: IAtatOptions): void {
  Object.assign(DEFAULT_OPTIONS, opts);
}

export async function parse(
  input: string,
  options: IAtatOptions = {},
): Promise<IAtatTemplate> {
  const ctx = new AtatContext(options);

  const output = await compile(input, ctx);

  // tslint:disable-next-line: no-function-constructor-with-string-args
  const result = new Function(ctx.arguments, `${output};return this.output;`);

  const template = (model: any) => {
    ctx.output = '';
    ctx.model = model || ctx.model;

    let body = result.call(ctx, ctx.model, ctx.helpers, ctx.body);

    if (ctx.layout) {
      ctx.layout.context.body = body;
      body = ctx.layout(ctx.model);
    }

    return body;
  };

  template.context = ctx;

  ctx.template = template;

  return ctx.template;
}

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

export async function render(
  input: string,
  model: any = {},
  options: IAtatOptions = {},
): Promise<string> {
  const template = await parse(input, options);
  return template(model);
}

export async function loadAndRender(
  path: string,
  model: any,
  options: IAtatOptions = {},
): Promise<string> {
  const template = await loadAndParse(path, options);
  return template(model);
}
