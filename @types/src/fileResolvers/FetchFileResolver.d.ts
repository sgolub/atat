import IFileResolver from './IFileResolver';
export default class FetchFileResolver implements IFileResolver {
    loadFile: (path: string, callback: (err: any, content?: any) => void) => Promise<void>;
}
