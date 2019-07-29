import { IMuchResult } from './common';
export declare function match_recursive(str: string, left: RegExp, right: RegExp): IMuchResult[];
export declare function regexp_test(str: string, regexp: RegExp, pos?: number): boolean;
export declare function regexp_exec(str: string, regexp: RegExp, pos?: number): RegExpExecArray;
export declare function clean_array(array: any[]): void;
export declare function match_inline(str: string, regexp: RegExp): any[];
