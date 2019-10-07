export default (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const fs = require('fs');
      fs.readFile(path, 'utf-8', (err: Error, data: string) =>
        err ? reject(err) : resolve(data),
      );
    } catch (err) {
      reject(err);
    }
  });
};
