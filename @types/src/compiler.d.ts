import { AtatCallback } from './common';
import { AtatContext } from './context';
export declare class AtatCompiler {
    compile(input: string, ctx: AtatContext, callback: AtatCallback<string>): void;
    private compileInline;
}
