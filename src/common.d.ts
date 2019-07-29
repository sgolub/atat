import { AtatContext } from './context';
export declare type AtatCallback<T> = (err?: any, result?: T) => void;
export declare type AtatHelper = (...args: any[]) => string;
export interface IAtatTemplate {
    (model: any): string;
    context?: AtatContext;
}
export declare type AtatCompileFunction = (inside: any, ctx: AtatContext, callback: AtatCallback<string>) => void;
export interface IAtatTag {
    compiler: AtatCompileFunction;
    regexp: RegExp;
}
export interface IKeyValuePair<T> {
    [key: string]: T;
}
export declare type ArrayOrKeyValuePair<T> = T[] | IKeyValuePair<T>;
export interface IMuchResult {
    name: string;
    value: string;
    start: number;
    end: number;
    left?: {
        value: string;
        start: number;
        end: number;
    };
    right?: {
        value: string;
        start: number;
        end: number;
    };
}
export declare function noop(): void;
export declare const VALUE_NAME_OUTSIDE = "outside";
export declare const VALUE_NAME_INSIDE = "inside";
export declare const HTML_RULES: IKeyValuePair<string>;
export declare const CLEAR_TAGS: RegExp;
export declare const MATCH_HTML: RegExp;
