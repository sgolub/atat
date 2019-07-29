import { IMuchResult } from './common';
export declare function matchRecursive(str: string, left: RegExp, right: RegExp): IMuchResult[];
export declare function regexpTest(str: string, regexp: RegExp, pos?: number): boolean;
export declare function regexpExec(str: string, regexp: RegExp, pos?: number): RegExpExecArray;
export declare function cleanArray(array: any[]): void;
export declare function matchInline(str: string, regexp: RegExp): any[];
