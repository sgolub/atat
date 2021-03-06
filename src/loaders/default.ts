export const DEFAULT_LOADER = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(path, 'utf-8', (err: Error, data: string) =>
      err ? reject(err) : resolve(data),
    );
  });
};
