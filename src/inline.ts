import { atat } from './atat';
import {
  AtatCallback,
  AtatCompileFunction,
  IAtatTemplate,
  IMuchResult,
} from './common';
import { AtatContext } from './context';
import { escapeQuotes } from './helpers';

export const inlineTags: { [key: string]: AtatCompileFunction } = {
  '(@!\\()([^]*?)(\\)@)': outputAsHtml,
  '(@\\()([^]*?)(\\)@)': outputAsText,
  '(@layout\\()([^]*?)(\\)@)': compileLayout,
  '(@partial\\()([^]*?)(\\)@)': compilePartial,
  '(@section\\()([^]*?)(\\)@)': outputSection,
};

function outputAsText(
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

function outputAsHtml(
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

function compileLayout(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    if (ctx.layout) {
      return callback();
    }

    atat.loadAndParse(
      escapeQuotes(inside.value),
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

function compilePartial(
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

    const uri = escapeQuotes(args.shift());

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

function outputSection(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  try {
    const name = escapeQuotes(inside.value);

    const output =
      `this.output += (function(){var s = this.section('${name}'); ` +
      `return s?s(${ctx.arguments}):"";}).call(this);`;

    callback(null, output);
  } catch (e) {
    callback(e);
  }
}

export function outputCallHelper(
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
