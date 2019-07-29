import { ArrayOrKeyValuePair, AtatCallback, AtatCompileFunction, AtatHelper, IAtatTag, IKeyValuePair } from './common';
export declare const helpers: {
    [key: string]: AtatHelper;
};
export declare function merge(src: IKeyValuePair<any>, dest?: IKeyValuePair<any>): IKeyValuePair<any>;
export declare function getTags(tags: {
    [key: string]: AtatCompileFunction;
}): {
    compilers: IAtatTag[];
    close: RegExp;
    open: RegExp;
};
export declare function getTagsInline(inlineTags: {
    [key: string]: AtatCompileFunction;
}): RegExp;
export declare function loop<T>(array: ArrayOrKeyValuePair<T>, fn: (item: T, index: string | number, array: ArrayOrKeyValuePair<T>) => void): void;
export declare function loopAsync<T>(array: T[], fn: (item: T, i: number, array: T[], callback: AtatCallback<string>) => void, callback: AtatCallback<string[]>): void;
export declare function encodeHtml(code?: string): string;
export declare function trimString(str: string, ...chars: string[]): any;
export declare function escapeQuotes(str: string): any;
export declare function jsonStringify(obj: any): string;
export declare function joinHelper(array?: string[], separator?: string): any;
export declare function uppercaseHelper(str?: string): string;
export declare function lowercaseHelper(str?: string): string;
export declare function resolveUrl(base: string, relative: string): string;
