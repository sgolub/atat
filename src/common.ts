import { AtatContext } from './context';

export type AtatCallback<T> = (err?: any, result?: T) => void;

export type AtatHelper = (...args: any[]) => string;

export interface IAtatTemplate {
  (model: any): string;
  context?: AtatContext;
}

export type AtatCompileFunction = (
  inside: any,
  ctx: AtatContext,
  callback: AtatCallback<string>,
) => void;

export interface IAtatTag {
  compiler: AtatCompileFunction;
  regexp: RegExp;
}

export interface IKeyValuePair<T> {
  [key: string]: T;
}

export type ArrayOrKeyValuePair<T> = T[] | IKeyValuePair<T>;

export interface IMuchResult {
  name: string;
  value: string;
  start: number;
  end: number;
  left?: { value: string; start: number; end: number };
  right?: { value: string; start: number; end: number };
}

// tslint:disable-next-line: no-empty
export function noop() {}

export const VALUE_NAME_OUTSIDE = 'outside';

export const VALUE_NAME_INSIDE = 'inside';

export const HTML_RULES: IKeyValuePair<string> = {
  '"': '&#34;',
  '&': '&#38;',
  "'": '&#39;',
  '/': '&#47;',
  '<': '&#60;',
  '>': '&#62;',
};

export const CLEAR_TAGS = /[-[\](){}*+?.,\\^$|#\s]/g;

export const MATCH_HTML = /&(?!#?\w+;)|<|>|"|'|\//g;
