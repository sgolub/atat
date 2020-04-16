import { loadAndParse, parse } from './atat';
import { AtatContext } from './context';
import {
  AtatHelper,
  IAtatCompileFunction,
  IAtatTag,
  IMuchResultInside,
  MuchResult,
  MuchResultTypes,
} from './types';
import {
  encodeHtml,
  escapeQuotes,
  joinHelper,
  jsonStringify,
  loopAsync,
  lowercaseHelper,
  matchInline,
  matchRecursive,
  regexpExec,
  uppercaseHelper,
  regexpTest,
} from './utils';

export const helpers: { [key: string]: AtatHelper } = {
  encode: encodeHtml,
  join: joinHelper,
  json: jsonStringify,
  lower: lowercaseHelper,
  upper: uppercaseHelper,
};

export const tags: {
  open: RegExp;
  close: RegExp;
  inline: RegExp;
  compilers: IAtatTag[];
} = {
  open: /@\{|@for\s*\(|@function\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\(|@if\s*\(|@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\{|@while\s*\(/g,
  close: /}@/g,
  inline: /(@\()([^]*?)(\)@)|(@!\()([^]*?)(\)@)|(@[a-zA-Z_$]{1}[a-zA-Z_$0-9]*\()([^]*?)(\)@)/g,
  compilers: [
    { regexp: /@\{/g, compiler: compileCode },
    { regexp: /@for\s*\(/g, compiler: compileFor },
    {
      regexp: /@function\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\(/g,
      compiler: compileFunction,
    },
    { regexp: /@if\s*\(/g, compiler: compileIf },
    {
      regexp: /@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\{/g,
      compiler: compileSection,
    },
    { regexp: /@while\s*\(/g, compiler: compileWhile },
    { regexp: /(@\()([^]*?)(\)@)/g, compiler: outputAsText },
    { regexp: /(@!\()([^]*?)(\)@)/g, compiler: outputAsHtml },
    { regexp: /(@layout\()([^]*?)(\)@)/g, compiler: compileLayout },
    { regexp: /(@partial\()([^]*?)(\)@)/g, compiler: compilePartial },
    { regexp: /(@section\()([^]*?)(\)@)/g, compiler: outputSection },
    {
      regexp: /(@[a-zA-Z_$]{1}[a-zA-Z_$0-9]*\()([^]*?)(\)@)/g,
      compiler: outputCallHelper,
    },
  ],
};

function getCompiler(str: string) {
  for (let i = 0, l = tags.compilers.length; i < l; i += 1) {
    const item = tags.compilers[i];
    if (regexpTest(str, item.regexp)) {
      return item.compiler;
    }
  }

  return null;
}

export async function compile(
  input: string,
  ctx: AtatContext,
): Promise<string> {
  if (input.length === 0) {
    return '';
  }

  const blocks = matchRecursive(input, tags.open, tags.close);

  const results = await loopAsync(blocks, async block => {
    if (block.name === MuchResultTypes.OUTSIDE) {
      if (block.value.trim() === '') {
        return '';
      }
      return await compileInline(block.value.trim(), ctx);
    }

    // block.name === MuchResultTypes.INSIDE
    const { left } = block;

    const compiler = getCompiler(left.value) as IAtatCompileFunction;

    const result = await compiler(block, ctx);
    return result || '';
  });

  return results.join('');
}

export async function compileInline(
  input: string,
  ctx: AtatContext,
): Promise<string> {
  const blocks = matchInline(input, tags.inline);

  const results = await loopAsync(blocks, async block => {
    if (block.name === MuchResultTypes.OUTSIDE) {
      ctx.parts.push(block.value);
      return ` this.output += this.parts[${ctx.parts.length - 1}];`;
    }

    // block.name === MuchResultTypes.INSIDE
    const { left, value, right } = block;

    if (value.trim() === '') {
      return '';
    }

    const compiler = getCompiler(
      left.value + value + right.value,
    ) as IAtatCompileFunction;

    const result = await compiler(block, ctx);
    return result || '';
  });

  return results.join('');
}

// compilers
export async function compileCode(inside: MuchResult): Promise<string> {
  return inside.value;
}

export async function compileFor(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string> {
  const code = `for(${inside.value}}`;
  const [{ value: value1 }, { value: value2 }] = matchRecursive(
    code,
    /\{/g,
    /\}/g,
  );
  let out = value1.trim();
  out += '{';
  out += await compile(value2.trim(), ctx);
  out += '}';
  return out;
}

export async function compileFunction(
  inside: IMuchResultInside,
): Promise<string> {
  const left = inside.left.value.trim().substring(1);
  return `${left}${inside.value}}\n`;
}

export async function compileIf(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string> {
  const code = `if(${inside.value}}`;

  const blocks = matchRecursive(code, /\{/g, /\}/g);

  const results = await loopAsync(blocks, async (block, i) => {
    if (block.name === MuchResultTypes.OUTSIDE) {
      if (i === 0) {
        return block.value + '{';
      }
      return '}' + block.value + '{';
    }

    const result = await compile(block.value.trim(), ctx);
    return result;
  });

  return results.join('') + '}';
}

export async function compileSection(
  inside: IMuchResultInside,
  ctx: AtatContext,
): Promise<string | void> {
  const block = inside.value.trim();
  const value = inside.left.value.trim();
  const regName = /^@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)+\s*\{/g;
  const match = regexpExec(value, regName);
  if (!match || match.length > 2) {
    throw new Error('Section name is not specified');
  }
  const name = match[1].trim();
  const template = await parse(block, ctx.options);
  if (ctx.sections.has(name)) {
    throw new Error(`The section "${name}" is already specified`);
  }
  template.context.parent = ctx;
  ctx.sections.set(name, template);
}

export async function compileWhile(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const code = `while(${inside.value}}`;

  const [{ value: value1 }, { value: value2 }] = matchRecursive(
    code,
    /\{/g,
    /\}/g,
  );

  let out = value1.trim();
  out += '{';
  out += await compile(value2.trim(), ctx);
  out += '}';

  return out;
}

// inline
export async function outputAsText(inside: MuchResult): Promise<string | void> {
  return ` this.output += this.helper('encode')(${inside.value.trim()});`;
}

export async function outputAsHtml(inside: MuchResult): Promise<string | void> {
  return ` this.output += String(${inside.value.trim()});`;
}

export async function compileLayout(
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

export async function compilePartial(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const value = inside.value.trim();
  const args = value.split(/\s*,\s*/g);
  const uri = escapeQuotes(args.shift() || '');
  const template = await loadAndParse(uri, ctx.options);
  ctx.partials.push(template);
  template.context.parent = ctx;
  const output = ` this.output += this.partials[${ctx.partials.length -
    1}](${args});`;

  return output;
}

export async function outputSection(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const name = escapeQuotes(inside.value);
  const output = ` this.output += this.section('${name}')(${ctx.options.it}, ${ctx.options.$});`;

  return output;
}

export async function outputCallHelper(
  inside: IMuchResultInside,
): Promise<string> {
  const { left, value } = inside;
  const name = left.value.substring(1, left.value.length - 1);
  return ` this.output += this.helper('${name}')(${value.trim()});`;
}
