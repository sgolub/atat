import { AtatContext } from './context';

export type AtatHelper = (...args: any[]) => string;

export interface IAtatTemplate {
  (model?: any): string;
  context: AtatContext;
}

export type IAtatCompileFunction = (
  inside: any,
  ctx: AtatContext,
) => Promise<string | void>;

export interface IAtatTag {
  compiler: IAtatCompileFunction;
  regexp: RegExp;
}

export interface IKeyValuePair<T> {
  [key: string]: T;
}

export type ArrayOrKeyValuePair<T> = T[] | IKeyValuePair<T>;

export type MuchResult = IMuchResultOutside | IMuchResultInside;

export interface IMuchResultOutside {
  name: MuchResultTypes.OUTSIDE;
  value: string;
  start: number;
  end: number;
}

export interface IMuchResultInside {
  name: MuchResultTypes.INSIDE;
  value: string;
  start: number;
  end: number;
  left: {
    value: string;
    start: number;
    end: number;
  };
  right: {
    value: string;
    start: number;
    end: number;
  };
}

export enum MuchResultTypes {
  OUTSIDE = 'outside',
  INSIDE = 'inside',
}

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
