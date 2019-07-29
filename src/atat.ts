import { AtatCallback, IAtatTemplate, noop } from './common';
import { AtatCompiler } from './compiler';
import { AtatContext } from './context';
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

  parse(
    input: string,
    optionsArg: IAtatOptions | AtatCallback<IAtatTemplate> = {},
    callbackArg: AtatCallback<IAtatTemplate> = noop,
  ) {
    let options = optionsArg;
    let callback = callbackArg;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (callback === noop && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        atat.parse(input, options, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }

    const ctx = new AtatContext(options);

    const compiler = new AtatCompiler();

    compiler.compile(input, ctx, (err: any, output: string) => {
      if (err) {
        return callback(err);
      }

      // tslint:disable-next-line: no-function-constructor-with-string-args
      const render = new Function(
        ctx.arguments,
        `${output};return this.output;`,
      );

      ctx.template = (model: any) => {
        try {
          ctx.output = '';
          ctx.model = model || ctx.model;

          let body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);

          if (ctx.layout) {
            ctx.layout.context.body = body;
            body = ctx.layout(ctx.model);
          }

          return body;
        } catch (e) {
          return e.toString();
        }
      };

      ctx.template.context = ctx;

      callback(null, ctx.template);
    });
  },

  loadAndParse(
    path: string,
    optionsArg: IAtatOptions | AtatCallback<IAtatTemplate> = {},
    callbackArg: AtatCallback<IAtatTemplate> = noop,
  ): Promise<IAtatTemplate> | void {
    let options = optionsArg;
    let callback = callbackArg;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (callback === noop && typeof Promise !== 'undefined') {
      return new Promise<IAtatTemplate>((resolve, reject) => {
        atat.loadAndParse(path, options, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }

    const fileResolver = options.fileResolver || DEFAULT_OPTIONS.fileResolver;

    fileResolver.loadFile(path, (err, content) => {
      err ? callback(err) : atat.parse(content, options, callback);
    });
  },

  render(
    input: string,
    model: any = {},
    optionsArg: IAtatOptions | AtatCallback<string> = {},
    callbackArg: AtatCallback<string> = noop,
  ) {
    let options = optionsArg;
    let callback = callbackArg;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (callback === noop && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        atat.render(input, model, options, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }

    atat.parse(input, options, (err, render) => {
      err ? callback(err) : callback(null, render(model));
    });
  },

  loadAndRender(
    path: string,
    model: any,
    optionsArg: IAtatOptions | AtatCallback<string> = {},
    callbackArg: AtatCallback<string> = noop,
  ) {
    let options = optionsArg;
    let callback = callbackArg;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (callback === noop && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        atat.loadAndRender(path, model, options, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }

    atat.loadAndParse(path, options, (err, render) => {
      err ? callback(err) : callback(null, render(model));
    });
  },

  // tslint:disable-next-line: function-name
  __express(
    path: string,
    options: any,
    callback: (err?: any, res?: string) => any,
  ) {
    atat.loadAndParse(path, (err: any, template: IAtatTemplate) => {
      err ? callback(err.toString()) : callback(null, template(options));
    });
  },
};
