import IFileResolver from './IFileResolver';

export default class FetchFileResolver implements IFileResolver {
  public loadFile = async (
    path: string,
    callback: (err: any, content?: any) => void,
  ): Promise<void> => {
    try {
      const res = await fetch(path);
      callback(null, await res.text());
    } catch (err) {
      callback(err);
    }
  }
}
