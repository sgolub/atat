import { AtatCallback, VALUE_NAME_INSIDE, VALUE_NAME_OUTSIDE } from './common';
import { AtatContext } from './context';
import { loopAsync } from './helpers';
import { outputCallHelper } from './inline';
import { matchInline, matchRecursive } from './regexp';

export class AtatCompiler {
  public compile(
    input: string,
    ctx: AtatContext,
    callback: AtatCallback<string>,
  ) {
    try {
      if (input.length === 0) {
        callback(null, '');
        return;
      }

      const blocks = matchRecursive(input, ctx.tags.open, ctx.tags.close);

      loopAsync(
        blocks,
        (block, i, array, loopCallback) => {
          try {
            if (block.name === VALUE_NAME_OUTSIDE) {
              if (block.value.trim() === '') {
                loopCallback(null, '');

                return;
              }

              this.compileInline(block.value, ctx, loopCallback);

              return;
            }

            if (block.name === VALUE_NAME_INSIDE) {
              const left = block.left;
              const inside = block;
              const right = block.right;

              const compiler = ctx.compiler(left.value);

              if (!compiler) {
                this.compileInline(
                  left.value + inside.value + right.value,
                  ctx,
                  loopCallback,
                );

                return;
              }

              compiler.call(this, inside, ctx, loopCallback);

              return;
            }
          } catch (e) {
            loopCallback(e);
          }
        },
        (err, results) => {
          if (err) {
            return callback(err);
          }

          callback(null, results.join(''));
        },
      );
    } catch (e) {
      callback(e);
    }
  }

  private compileInline(
    input: string,
    ctx: AtatContext,
    callback: AtatCallback<string>,
  ) {
    try {
      if (input.length === 0) {
        callback(null, '');
        return;
      }

      const blocks = matchInline(input, ctx.inline);

      loopAsync(
        blocks,
        (block, i, array, loopCallback) => {
          try {
            if (block.name === VALUE_NAME_OUTSIDE) {
              ctx.parts.push(block.value);
              loopCallback(
                null,
                `this.output += this.parts[${ctx.parts.length - 1}];`,
              );

              return;
            }

            if (block.name === VALUE_NAME_INSIDE) {
              const left = block.left;
              const inside = block;
              const right = block.right;

              if (inside.value.trim() === '') {
                loopCallback(null, '');

                return;
              }

              const compiler = ctx.compiler(
                left.value + inside.value + right.value,
              );

              if (!compiler) {
                outputCallHelper.call(this, inside, ctx, loopCallback);
                return;
              }

              compiler.call(this, inside, ctx, loopCallback);

              return;
            }
          } catch (e) {
            loopCallback(e);
          }
        },
        (err, results) => {
          if (err) {
            return callback(err);
          }

          callback(null, results.join(''));
        },
      );
    } catch (e) {
      callback(e);
    }
  }
}
