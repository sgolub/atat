import IFileResolver from './IFileResolver';
export default class DefaultFileResolver implements IFileResolver {
    loadFile: (path: string, callback: (err: any, content?: any) => void) => void;
}
