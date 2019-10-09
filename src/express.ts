import { loadAndRender } from './atat';

// tslint:disable-next-line: function-name
export function __express(
  path: string,
  model: any,
  callback: (err?: any, res?: string) => any,
) {
  (async () => {
    try {
      const result = await loadAndRender(path, model);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  })();
}
