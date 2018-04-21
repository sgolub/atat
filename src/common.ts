import { AtatContext } from "./context";

export type AtatCallback<T> = (err?: any, result?: T) => void;

export type AtatHelper = (...args: any[]) => string;

export type AtatTemplate = { (model: any): string, context?: AtatContext };

export type AtatCompileFunction = (inside: any, ctx: AtatContext, callback: AtatCallback<string>) => void;

export type AtatTag = { compiler: AtatCompileFunction, regexp: RegExp };

export type KeyValuePair<T> = { [key: string]: T };

export type ArrayOrKeyValuePair<T> = T[] | KeyValuePair<T>;

export type MuchResult = { name: string, value: string, start: number, end: number, left?: { value: string, start: number, end: number }, right?: { value: string, start: number, end: number } };

export function noop() { }

export const VALUE_NAME_OUTSIDE = 'outside';

export const VALUE_NAME_INSIDE = 'inside';

export const HTML_RULES: KeyValuePair<string> = { '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;', '/': '&#47;' };

export const CLEAR_TAGS = /[-[\](){}*+?.,\\^$|#\s]/g;

export const MATCH_HTML = /&(?!#?\w+;)|<|>|"|'|\//g;
