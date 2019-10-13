import { loadAndParse } from './atat';
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
  return `this.output += this.helpers.encode(${inside.value.trim()});`;
}

async function outputAsHtml(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  return `this.output += (${inside.value.trim()});`;
}

async function compileLayout(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const template = await loadAndParse(escapeQuotes(inside.value), ctx.options);
  if (ctx.layout) {
    throw new Error('Layout is already specified');
  }
  ctx.layout = template;
  template.context.parent = ctx;
}

async function compilePartial(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const value = inside.value.trim();
  const args = value.split(/\s*,\s*/g);
  const uri = escapeQuotes(args.shift() || '');
  const template = await loadAndParse(uri, ctx.options);
  ctx.partials.push(template);
  template.context.parent = ctx;
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
    throw new Error(`Helper "${name}" is not declarated`);
  }

  return `this.output += this.helpers.${name}(${value.trim()});`;
}
