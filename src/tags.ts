import { atat } from './atat';
import {
  AtatCallback,
  AtatCompileFunction,
  IMuchResult,
  VALUE_NAME_OUTSIDE,
} from './common';
import { AtatContext } from './context';
import { loop_async } from './helpers';
import { match_recursive, regexp_exec } from './regexp';

export const tags: { [key: string]: AtatCompileFunction } = {
  '@\\{': compile_code,
  '@for\\s*\\(': compile_for,
  '@function\\s+[$A-Za-z0-9]*\\s*\\(': compile_function,
  '@if\\s*\\(': compile_if,
  '@section\\s+[$A-Za-z0-9]*\\s*\\{': compile_section,
  '@while\\s*\\(': compile_while,
};

function compile_code(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  callback(null, inside.value.trim());
}

function compile_for(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `for(${inside.value}}`;

  const blocks = match_recursive(code, /\{/g, /\}/g);

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

function compile_function(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const left = inside.left.value.trim().substring(1);

  callback(null, `${left}${inside.value.trim()}}`);
}

function compile_if(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `if(${inside.value}}`;

  const blocks = match_recursive(code, /\{/g, /\}/g);

  loop_async(
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

function compile_section(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const block = inside.value.trim();

  const value = inside.left.value.trim();
  const regName = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
  const match = regexp_exec(value, regName);

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

function compile_while(
  inside: IMuchResult,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) {
  const code = `while(${inside.value}}`;

  const blocks = match_recursive(code, /\{/g, /\}/g);

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
