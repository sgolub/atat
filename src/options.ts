import { AtatLoader, DEFAULT_LOADER } from './loaders';
import { AtatHelper } from './types';

export interface IAtatOptions {
  it?: string;
  $?: string;
  helpers?: {
    [key: string]: AtatHelper;
  };
  loader?: AtatLoader;
}

export const DEFAULT_OPTIONS: IAtatOptions = {
  it: 'it',
  $: '$',
  helpers: {},
  loader: DEFAULT_LOADER,
};
