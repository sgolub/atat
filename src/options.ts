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

export const DEFAULT_OPTIONS: IAtatOptions = {
  $: '$',
  basepath: '',
  cache: true,
  helpers: {},
  it: 'it',
};
