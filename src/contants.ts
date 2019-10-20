import { IKeyValuePair } from './types';

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
