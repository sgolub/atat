import { AtatHelper } from './common';
import { IFileResolver } from './fileResolvers';
export interface IAtatOptions {
    it?: string;
    $?: string;
    helpers?: {
        [key: string]: AtatHelper;
    };
    fileResolver?: IFileResolver;
}
export declare const DEFAULT_OPTIONS: IAtatOptions;
