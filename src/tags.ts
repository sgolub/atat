import { atat } from './atat';
import {
  AtatCallback,
  AtatCompileFunction,
  IMuchResult,
  VALUE_NAME_OUTSIDE,
} from './common';
import { AtatContext } from './context';
import { loopAsync } from './helpers';
import { matchRecursive, regexpExec } from './regexp';

export const tags: { [key: string]: AtatCompileFunction } = {
  '@\\{': compileCode,
  '@for\\s*\\(': compileFor,
  '@function\\s+[$A-Za-z0-9]*\\s*\\(': compileFunction,
  '@if\\s*\\(': compileIf,
  '@section\\s+[$A-Za-z0-9]*\\s*\\{': compileSection,
  '@while\\s*\\(': compileWhile,
};

function compileCode(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  callback(null, inside.value.trim());
}

function compileFor(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `for(${inside.value}}`;

  const blocks = matchRecursive(code, /\{/g, /\}/g);

  let out = '';

  out += blocks[0].value;
  out += '{';

  this.compile(blocks[1].value, ctx, (err: any, res: string) => {
    if (err) {
      return callback(err);
    }

    out += res;
    out += '}';

    callback(null, out);
  });
}

function compileFunction(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const left = inside.left.value.trim().substring(1);

  callback(null, `${left}${inside.value.trim()}}`);
}

function compileIf(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `if(${inside.value}}`;

  const blocks = matchRecursive(code, /\{/g, /\}/g);

  loopAsync(
    blocks,
    (block, i, array, loopCallback) => {
      if (block.name === VALUE_NAME_OUTSIDE) {
        return loopCallback(null, block.value);
      }

      this.compile(block.value, ctx, loopCallback);
    },
    (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.join(''));
    },
  );
}

function compileSection(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const block = inside.value.trim();

  const value = inside.left.value.trim();
  const regName = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
  const match = regexpExec(value, regName);

  if (!match || match.length > 2) {
    return callback(new Error('Section parsing error'));
  }

  const name = match[1].trim();

  if (ctx.sections[name]) {
    return callback(new Error('Section already exists'));
  }

  atat.parse(block, ctx.options, (err, template) => {
    if (err) {
      return callback(err);
    }

    template.context.parent = ctx;
    ctx.sections[name] = template;

    callback(null);
  });
}

function compileWhile(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `while(${inside.value}}`;

  const blocks = matchRecursive(code, /\{/g, /\}/g);

  let out = '';

  out += blocks[0].value;
  out += '{';

  this.compile(blocks[1].value, ctx, (err: any, res: string) => {
    if (err) {
      return callback(err);
    }

    out += res;
    out += '}';

    callback(null, out);
  });
}
