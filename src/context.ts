import { helpers } from './compiler';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { AtatHelper, IAtatTemplate } from './types';
import { merge } from './utils';
import { AtatLoader } from './loaders';

export class AtatContext {
  public options: { it: string; $: string; loader: AtatLoader };
  public helpers: { [key: string]: AtatHelper };

  public parent: AtatContext | null = null;
  public parts: string[] = [];
  public body: string | null = null;
  public output: string = '';
  public sections: Map<string, IAtatTemplate> = new Map();
  public partials: IAtatTemplate[] = [];
  public layout: IAtatTemplate | null = null;

  constructor(options: IAtatOptions) {
    const { it, $, loader } = merge(DEFAULT_OPTIONS, options);
    this.options = { it, $, loader };
    this.helpers = merge(helpers, options.helpers);
  }

  public getSection(name: string): IAtatTemplate | null {
    return this.sections.has(name)
      ? this.sections.get(name) || null
      : this.parent
      ? this.parent.getSection(name)
      : null;
  }
}
