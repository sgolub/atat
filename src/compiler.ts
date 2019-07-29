import { AtatCallback, VALUE_NAME_INSIDE, VALUE_NAME_OUTSIDE } from './common';
import { AtatContext } from './context';
import { loop_async } from './helpers';
import { output_call_helper } from './inline';
import { match_inline, match_recursive } from './regexp';

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

      const blocks = match_recursive(input, ctx.tags.open, ctx.tags.close);

      loop_async(
        blocks,
        (block, i, array, loopCallback) => {
          try {
            if (block.name === VALUE_NAME_OUTSIDE) {
              if (block.value.trim() === '') {
                loopCallback(null, '');

                return;
              }

              this.compile_inline(block.value, ctx, loopCallback);

              return;
            }

            if (block.name === VALUE_NAME_INSIDE) {
              const left = block.left;
              const inside = block;
              const right = block.right;

              const compiler = ctx.compiler(left.value);

              if (!compiler) {
                this.compile_inline(
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

  private compile_inline(
    input: string,
    ctx: AtatContext,
    callback: AtatCallback<string>,
  ) {
    try {
      if (input.length === 0) {
        callback(null, '');
        return;
      }

      const blocks = match_inline(input, ctx.inline);

      loop_async(
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
                output_call_helper.call(this, inside, ctx, loopCallback);
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
