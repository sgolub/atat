export default interface IFileResolve {
  loadFile: (path: string, callback: (err, content) => void) => void;
}
