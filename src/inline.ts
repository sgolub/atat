import { atat } from './atat';
import {
  AtatCallback,
  AtatCompileFunction,
  IAtatTemplate,
  IMuchResult,
} from './common';
import { AtatContext } from './context';
import { escape_quotes } from './helpers';

export const inlineTags: { [key: string]: AtatCompileFunction } = {
  '(@!\\()([^]*?)(\\)@)': output_as_html,
  '(@\\()([^]*?)(\\)@)': output_as_text,
  '(@layout\\()([^]*?)(\\)@)': compile_layout,
  '(@partial\\()([^]*?)(\\)@)': compile_partial,
  '(@section\\()([^]*?)(\\)@)': output_section,
};

function output_as_text(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const val = inside.value.trim();

    if (val === '') {
      callback();
    }

    callback(
      null,
      `this.output += this.helpers.encode(${inside.value.trim()});`,
    );
  } catch (e) {
    callback(e);
  }
}

function output_as_html(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const val = inside.value.trim();

    if (val === '') {
      callback();
    }

    callback(null, `this.output += (${inside.value.trim()});`);
  } catch (e) {
    callback(e);
  }
}

function compile_layout(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    if (ctx.layout) {
      return callback();
    }

    atat.loadAndParse(
      escape_quotes(inside.value),
      ctx.options,
      (err: any, template: IAtatTemplate) => {
        if (err) {
          return callback(err);
        }

        ctx.layout = template;
        template.context.parent = ctx;

        callback();
      },
    );
  } catch (e) {
    callback(e);
  }
}

function compile_partial(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const value = inside.value.trim();

    if (value === '') {
      return callback(new Error('Partial parsing error'));
    }

    const args = value.split(/\s*,\s*/g);

    const uri = escape_quotes(args.shift());

    atat.loadAndParse(uri, ctx.options, (err: any, template: IAtatTemplate) => {
      if (err) {
        return callback(err);
      }

      ctx.partials.push(template);
      template.context.parent = ctx;

      const output = `this.output += this.partials[${ctx.partials.length -
        1}](${args});`;

      callback(null, output);
    });
  } catch (e) {
    callback(e);
  }
}

function output_section(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const name = escape_quotes(inside.value);

    const output =
      `this.output += (function(){var s = this.section('${name}'); ` +
      `return s?s(${ctx.arguments}):"";}).call(this);`;

    callback(null, output);
  } catch (e) {
    callback(e);
  }
}

export function output_call_helper(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const name = inside.left.value.substring(1, inside.left.value.length - 1);

    if (typeof ctx.helpers[name] !== 'function') {
      throw new Error(`Helper ${name} isn't declarated`);
    }

    callback(
      null,
      `this.output += this.helpers.${name}(${inside.value.trim()});`,
    );
  } catch (e) {
    callback(e);
  }
}
