import { AtatHelper } from './common';
import { DefaultFileResolver, IFileResolver } from './fileResolvers';

export interface IAtatOptions {
  it?: string;
  $?: string;
  helpers?: {
    [key: string]: AtatHelper;
  };
  fileResolver?: IFileResolver;
}

export const DEFAULT_OPTIONS: IAtatOptions = {
  it: 'it',
  $: '$',
  helpers: {},
  fileResolver: new DefaultFileResolver(),
};
