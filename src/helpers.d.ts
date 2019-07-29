import { ArrayOrKeyValuePair, AtatCallback, AtatCompileFunction, AtatHelper, IAtatTag, IKeyValuePair } from './common';
export declare const helpers: {
    [key: string]: AtatHelper;
};
export declare function merge(src: IKeyValuePair<any>, dest?: IKeyValuePair<any>): IKeyValuePair<any>;
export declare function get_tags(tags: {
    [key: string]: AtatCompileFunction;
}): {
    compilers: IAtatTag[];
    close: RegExp;
    open: RegExp;
};
export declare function get_tags_inline(inlineTags: {
    [key: string]: AtatCompileFunction;
}): RegExp;
export declare function loop<T>(array: ArrayOrKeyValuePair<T>, fn: (item: T, index: string | number, array: ArrayOrKeyValuePair<T>) => void): void;
export declare function loop_async<T>(array: T[], fn: (item: T, i: number, array: T[], callback: AtatCallback<string>) => void, callback: AtatCallback<string[]>): void;
export declare function encode_html(code?: string): string;
export declare function trim_string(str: string, ...chars: string[]): any;
export declare function escape_quotes(str: string): any;
export declare function json_stringify(obj: any): string;
export declare function join_helper(array?: string[], separator?: string): any;
export declare function uppercase_helper(str?: string): string;
export declare function lowercase_helper(str?: string): string;
export declare function resolveUrl(base: string, relative: string): string;
