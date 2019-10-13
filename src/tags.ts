import { parse } from './atat';
import {
  IAtatCompileFunction,
  IMuchResultInside,
  MuchResult,
  MuchResultTypes,
} from './common';
import { AtatCompiler } from './compiler';
import { AtatContext } from './context';
import { loopAsync } from './helpers';
import { matchRecursive, regexpExec } from './regexp';

export const tags: { [key: string]: IAtatCompileFunction } = {
  '@\\{': compileCode,
  '@for\\s*\\(': compileFor,
  '@function\\s+[$A-Za-z0-9]*\\s*\\(': compileFunction,
  '@if\\s*\\(': compileIf,
  '@section\\s+[$A-Za-z0-9]*\\s*\\{': compileSection,
  '@while\\s*\\(': compileWhile,
};

async function compileCode(
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string> {
  return inside.value.trim();
}

async function compileFor(
  this: AtatCompiler,
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string> {
  const code = `for(${inside.value}}`;
  const [{ value: value1 }, { value: value2 }] = matchRecursive(
    code,
    /\{/g,
    /\}/g,
  );
  let out = value1;
  out += '{';
  out += await this.compile(value2, ctx);
  out += '}';
  return out;
}

async function compileFunction(
  inside: IMuchResultInside,
  ctx: AtatContext,
): Promise<string> {
  const left = inside.left.value.trim().substring(1);
  return `${left}${inside.value.trim()}}`;
}

async function compileIf(
  this: AtatCompiler,
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string> {
  const code = `if(${inside.value}}`;

  const blocks = matchRecursive(code, /\{/g, /\}/g);

  const results = await loopAsync(blocks, async (block, i, array) => {
    if (block.name === MuchResultTypes.OUTSIDE) {
      return block.value;
    }

    const result = await this.compile(block.value, ctx);
    return result;
  });

  return results.join('');
}

async function compileSection(
  inside: IMuchResultInside,
  ctx: AtatContext,
): Promise<string | void> {
  const block = inside.value.trim();
  const value = inside.left.value.trim();
  const regName = /^@section\s+([A-Za-z0-9_]+)\s*\{/g;
  const match = regexpExec(value, regName);
  if (!match || match.length > 2) {
    throw new Error('Section name is not specified');
  }
  const name = match[1].trim();
  const template = await parse(block, ctx.options);
  if (ctx.sections[name]) {
    throw new Error(`The section "${name}" is already specified`);
  }
  template.context.parent = ctx;
  ctx.sections[name] = template;
}

async function compileWhile(
  this: AtatCompiler,
  inside: MuchResult,
  ctx: AtatContext,
): Promise<string | void> {
  const code = `while(${inside.value}}`;

  const [{ value: value1 }, { value: value2 }] = matchRecursive(
    code,
    /\{/g,
    /\}/g,
  );

  let out = value1;
  out += '{';
  out += await this.compile(value2, ctx);
  out += '}';

  return out;
}
