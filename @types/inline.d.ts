import { AtatCallback, AtatCompileFunction, IMuchResult } from './common';
import { AtatContext } from './context';
export declare const inlineTags: {
    [key: string]: AtatCompileFunction;
};
export declare function outputCallHelper(inside: IMuchResult, ctx: AtatContext, callback: AtatCallback<string>): void;
