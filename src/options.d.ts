import { AtatHelper } from './common';
export interface IAtatOptions {
    it?: string;
    $?: string;
    basepath?: string;
    cache?: boolean;
    helpers?: {
        [key: string]: AtatHelper;
    };
}
export declare const DEFAULT_OPTIONS: IAtatOptions;
