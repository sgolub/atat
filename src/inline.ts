import { atat } from './atat';
import { IAtatCompileFunction, IMuchResultInside, MuchResult } from './common';
import { AtatContext } from './context';
import { escapeQuotes } from './helpers';

export const inlineTags: { [key: string]: IAtatCompileFunction } = {
  '(@\\()([^]*?)(\\)@)': outputAsText,
  '(@!\\()([^]*?)(\\)@)': outputAsHtml,
  '(@layout\\()([^]*?)(\\)@)': compileLayout,
  '(@partial\\()([^]*?)(\\)@)': compilePartial,
  '(@section\\()([^]*?)(\\)@)': outputSection,
};

async function outputAsText(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const val = inside.value.trim();

  if (val === '') {
    return;
  }

  return `this.output += this.helpers.encode(${inside.value.trim()});`;
}

async function outputAsHtml(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const val = inside.value.trim();

  if (val === '') {
    return;
  }

  return `this.output += (${inside.value.trim()});`;
}

async function compileLayout(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  if (ctx.layout) {
    return;
  }

  const template = await atat.loadAndParse(
    escapeQuotes(inside.value),
    ctx.options,
  );

  ctx.layout = template;
  if (template.context) {
    template.context.parent = ctx;
  }
}

async function compilePartial(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const value = inside.value.trim();

  if (value === '') {
    throw new Error('Partial parsing error');
  }

  const args = value.split(/\s*,\s*/g);

  const uri = escapeQuotes(args.shift() || '');

  const template = await atat.loadAndParse(uri, ctx.options);

  ctx.partials.push(template);
  if (template.context) {
    template.context.parent = ctx;
  }

  const output = `this.output += this.partials[${ctx.partials.length -
    1}](${args});`;

  return output;
}

async function outputSection(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const name = escapeQuotes(inside.value);

  const output =
    `this.output += (function(){var s = this.section('${name}'); ` +
    `return s?s(${ctx.arguments}):"";}).call(this);`;

  return output;
}

export async function outputCallHelper(
  inside: IMuchResultInside,
  ctx: AtatContext,
): Promise<string> {
  const { left, value } = inside;
  const name = left.value.substring(1, left.value.length - 1);

  if (typeof ctx.helpers[name] !== 'function') {
    throw new Error(`Helper ${name} isn't declarated`);
  }

  return `this.output += this.helpers.${name}(${value.trim()});`;
}
