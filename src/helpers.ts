import {
  ArrayOrKeyValuePair,
  AtatHelper,
  HTML_RULES,
  IAtatCompileFunction,
  IAtatTag,
  IKeyValuePair,
  MATCH_HTML,
} from './common';

export const helpers: { [key: string]: AtatHelper } = {
  encode: encodeHtml,
  join: joinHelper,
  json: jsonStringify,
  lower: lowercaseHelper,
  upper: uppercaseHelper,
};

export function merge(src: IKeyValuePair<any>, dest: IKeyValuePair<any> = {}) {
  for (const x in src) {
    if (!dest.hasOwnProperty(x) && src.hasOwnProperty(x)) {
      if (typeof src[x] === 'object') {
        dest[x] = merge(src[x]);
      } else {
        dest[x] = src[x];
      }
    }
  }

  return dest;
}

export function getTags(tags: IKeyValuePair<IAtatCompileFunction>) {
  const regexps: string[] = [];

  loopByObject(tags, (compiler: IAtatCompileFunction, regexp: string) => {
    regexps.push(regexp);
  });

  const compilers: IAtatTag[] = [];

  loopByObject(tags, (compiler, regexp: string) => {
    compilers.push({
      compiler,
      regexp: new RegExp(regexp, 'g'),
    });
  });

  return {
    compilers,
    close: /}@/g,
    open: new RegExp(regexps.join('|'), 'g'),
  };
}

export function getTagsInline(inlineTags: {
  [key: string]: IAtatCompileFunction;
}) {
  const regexps: string[] = [];

  loopByObject(inlineTags, (compiler: IAtatCompileFunction, regexp: string) => {
    regexps.push(regexp);
  });

  regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');

  return new RegExp(regexps.join('|'), 'g');
}

export function loopByObject<T>(
  array: IKeyValuePair<T>,
  fn: (item: T, index: string, array: IKeyValuePair<T>) => void,
) {
  for (const x in array) {
    if (array.hasOwnProperty(x)) {
      fn(array[x], x, array);
    }
  }
}

export async function loopAsync<T>(
  array: T[],
  fn: (item: T, i: number, array: T[]) => Promise<string>,
): Promise<string[]> {
  const promises: Array<Promise<string>> = [];

  for (let i = 0, l = array.length; i < l; i += 1) {
    promises.push(fn(array[i], i, array));
  }
  const results = await Promise.all(promises);

  return results;
}

export function encodeHtml(code: string) {
  return code.toString().replace(MATCH_HTML, m => {
    return HTML_RULES[m] || m;
  });
}

export function escapeQuotes(str: string) {
  return str
    .trim()
    .replace(/^"(.*)"$/g, '$1')
    .replace(/^'(.*)'$/g, '$1');
}

export function jsonStringify(obj: any) {
  return JSON.stringify(obj);
}

export function joinHelper(array: string[], separator = '') {
  return Array.prototype.join.call(array, separator);
}

export function uppercaseHelper(str: string) {
  return str.toString().toUpperCase();
}

export function lowercaseHelper(str: string) {
  return str.toString().toLowerCase();
}
