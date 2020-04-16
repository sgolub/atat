import { helpers } from './compiler';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { AtatHelper, IAtatTemplate } from './types';
import { merge, loopByObject, noop } from './utils';
import { AtatLoader } from './loaders';

export class AtatContext {
  public options: {
    it: string;
    $: string;
    loader: AtatLoader;
    helpers: { [name: string]: AtatHelper };
  };
  public helpers: Map<string, AtatHelper> = new Map();

  public parent: AtatContext | null = null;
  public parts: string[] = [];
  public body: string | null = null;
  public output: string = '';
  public sections: Map<string, IAtatTemplate> = new Map();
  public partials: IAtatTemplate[] = [];
  public layout: IAtatTemplate | null = null;

  constructor(options: IAtatOptions) {
    const { it, $, loader } = merge(DEFAULT_OPTIONS, options);
    this.options = { it, $, loader, helpers: {} };
    loopByObject(merge(helpers, options.helpers), (helper, name) => {
      this.helpers.set(name, helper);
      this.options.helpers[name] = helper;
    });
  }

  public section(name: string): IAtatTemplate {
    if (this.sections.has(name)) {
      return this.sections.get(name) as IAtatTemplate;
    } else if (this.parent) {
      return this.parent.section(name);
    } else {
      return noop as IAtatTemplate;
    }
  }

  public helper(name: string): AtatHelper {
    if (this.helpers.has(name)) {
      return this.helpers.get(name) as AtatHelper;
    } else if (this.parent) {
      return this.parent.helper(name);
    } else {
      throw new Error(`Helper "${name}" is not declarated`);
    }
  }
}
