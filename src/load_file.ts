// tslint:disable-next-line: no-var-requires
const fs = require('fs');

export function load_file(
  path: string,
  callback: (err?: any, content?: string) => void,
) {
  fs.readFile(path, 'utf-8', callback);
}
