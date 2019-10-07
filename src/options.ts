import { AtatHelper } from './common';
import { DefaultFileResolver, IFileResolver } from './fileResolvers';

export interface IAtatOptions {
  it?: string;
  $?: string;
  helpers?: {
    [key: string]: AtatHelper;
  };
  fileResolver?: IFileResolver;
  [key: string]: any;
}

export const DEFAULT_OPTIONS: IAtatOptions = {
  it: 'it',
  $: '$',
  helpers: {},
  fileResolver: DefaultFileResolver,
};
