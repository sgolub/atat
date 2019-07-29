export default interface IFileResolve {
    loadFile: (path: string, callback: (err: any, content: any) => void) => void;
}
