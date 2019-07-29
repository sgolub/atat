import IFileResolver from './IFileResolver';

export default class DefaultFileResolver implements IFileResolver {
  public loadFile = (
    path: string,
    callback: (err: any, content?: any) => void,
  ): void => {
    try {
      const fs = require('fs');
      fs.readFile(path, 'utf-8', callback);
    } catch (err) {
      callback(err);
    }
  }
}
