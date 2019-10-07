import { IAtatTemplate } from './common';
import { AtatCompiler } from './compiler';
import { AtatContext } from './context';
import { DefaultFileResolver } from './fileResolvers';
import { merge } from './helpers';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';

export const atat = {
  config(opts: IAtatOptions): void {
    const options = merge(DEFAULT_OPTIONS, opts);
    for (const x in options) {
      if (DEFAULT_OPTIONS.hasOwnProperty(x)) {
        DEFAULT_OPTIONS[x] = options[x];
      }
    }
  },

  async parse(
    input: string,
    options: IAtatOptions = {},
  ): Promise<IAtatTemplate> {
    const ctx = new AtatContext(options);

    const compiler = new AtatCompiler();

    const output = await compiler.compile(input, ctx);

    // tslint:disable-next-line: no-function-constructor-with-string-args
    const render = new Function(ctx.arguments, `${output};return this.output;`);

    ctx.template = (model: any) => {
      try {
        ctx.output = '';
        ctx.model = model || ctx.model;

        let body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);

        if (ctx.layout && ctx.layout.context) {
          ctx.layout.context.body = body;
          body = ctx.layout(ctx.model);
        }

        return body;
      } catch (e) {
        return e.toString();
      }
    };

    ctx.template.context = ctx;

    return ctx.template;
  },

  async loadAndParse(
    path: string,
    options: IAtatOptions = {},
  ): Promise<IAtatTemplate> {
    let fileResolver = options.fileResolver || DEFAULT_OPTIONS.fileResolver;

    if (!fileResolver) {
      fileResolver = DefaultFileResolver;
      options.fileResolver = fileResolver;
      DEFAULT_OPTIONS.fileResolver = fileResolver;
    }

    const content = await fileResolver(path);
    const template = await atat.parse(content, options);

    return template;
  },

  async render(
    input: string,
    model: any = {},
    options: IAtatOptions = {},
  ): Promise<string> {
    const template = await atat.parse(input, options);
    return template(model);
  },

  async loadAndRender(
    path: string,
    model: any,
    options: IAtatOptions = {},
  ): Promise<string> {
    const template = await atat.loadAndParse(path, options);
    return template(model);
  },

  // tslint:disable-next-line: function-name
  __express(
    path: string,
    model: any,
    callback: (err?: any, res?: string) => any,
  ) {
    (async () => {
      try {
        const result = await atat.loadAndRender(path, model);
        callback(null, result);
      } catch (err) {
        callback(err);
      }
    })();
  },
};
