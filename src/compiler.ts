import { IAtatCompileFunction, MuchResultTypes } from './common';
import { AtatContext } from './context';
import { loopAsync } from './helpers';
import { outputCallHelper } from './inline';
import { matchInline, matchRecursive } from './regexp';

export class AtatCompiler {
  public async compile(input: string, ctx: AtatContext): Promise<string> {
    if (input.length === 0) {
      return '';
    }

    const blocks = matchRecursive(input, ctx.tags.open, ctx.tags.close);

    const results = await loopAsync(blocks, async (block, i, array) => {
      if (block.name === MuchResultTypes.OUTSIDE) {
        if (block.value.trim() === '') {
          return '';
        }
        return await this.compileInline(block.value, ctx);
      }

      // block.name === MuchResultTypes.INSIDE
      const { left, right } = block;

      const compiler = ctx.compiler(left.value) as IAtatCompileFunction;

      const result = await compiler.call(this, block, ctx);
      return result || '';
    });

    return results.join('');
  }

  private async compileInline(
    input: string,
    ctx: AtatContext,
  ): Promise<string> {
    const blocks = matchInline(input, ctx.inline);

    const results = await loopAsync(blocks, async (block, i, array) => {
      if (block.name === MuchResultTypes.OUTSIDE) {
        ctx.parts.push(block.value);
        return `this.output += this.parts[${ctx.parts.length - 1}];`;
      }

      // block.name === MuchResultTypes.INSIDE
      const { left, right } = block;

      if (block.value.trim() === '') {
        return '';
      }

      const compiler = ctx.compiler(left.value + block.value + right.value);

      if (compiler === null) {
        return await outputCallHelper.call(this, block, ctx);
      }

      const result = await compiler.call(this, block, ctx);
      return result || '';
    });

    return results.join('');
  }
}
