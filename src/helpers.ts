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

export function getTags(tags: { [key: string]: IAtatCompileFunction }) {
  const regexps: string[] = [];

  loop(tags, (compiler: IAtatCompileFunction, regexp: string | number) => {
    if (regexps.indexOf(regexp as string) === -1) {
      regexps.push(regexp as string);
    }
  });

  const compilers: IAtatTag[] = [];

  loop(tags, (compiler, regexp: string | number) => {
    compilers.push({
      compiler,
      regexp: new RegExp(regexp as string, 'g'),
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

  loop(
    inlineTags,
    (compiler: IAtatCompileFunction, regexp: string | number) => {
      regexps.push(regexp as string);
    },
  );

  regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');

  return new RegExp(regexps.join('|'), 'g');
}

export function loop<T>(
  array: ArrayOrKeyValuePair<T>,
  fn: (item: T, index: string | number, array: ArrayOrKeyValuePair<T>) => void,
) {
  if (!Array.isArray(array)) {
    for (const x in array as IKeyValuePair<T>) {
      if (array.hasOwnProperty(x)) {
        fn(array[x], x, array);
      }
    }
    return;
  }

  for (let i = 0, l = array.length; i < l; i += 1) {
    fn(array[i], i, array);
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

export function encodeHtml(code = '') {
  return code.toString().replace(MATCH_HTML, m => {
    return HTML_RULES[m] || m;
  });
}

export function trimString(str: string, ...chars: string[]) {
  if (chars.length === 0) {
    return String.prototype.trim.call(str);
  }

  let result = str;

  while (chars.indexOf(str.charAt(0)) >= 0) {
    result = str.substring(1);
  }

  while (chars.indexOf(str.charAt(str.length - 1)) >= 0) {
    result = str.substring(0, str.length - 1);
  }

  return result;
}

export function escapeQuotes(str: string) {
  return trimString(str)
    .replace(/^"(.*)"$/g, '$1')
    .replace(/^'(.*)'$/g, '$1');
}

export function jsonStringify(obj: any) {
  return JSON.stringify(obj);
}

export function joinHelper(array: string[] = [], separator = '') {
  return Array.prototype.join.call(array, separator);
}

export function uppercaseHelper(str = '') {
  return str.toString().toUpperCase();
}

export function lowercaseHelper(str = '') {
  return str.toString().toLowerCase();
}

export function resolveUrl(base: string, relative: string) {
  const stack = base.split('/');
  const parts = relative.split('/');

  stack.pop();

  for (const part of parts) {
    if (part === '.') {
      continue;
    }

    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }

  return stack.join('/');
}
