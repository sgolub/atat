import { helpers, tags } from './compiler';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { AtatHelper, IAtatTag, IAtatTemplate } from './types';
import { merge, regexpTest } from './utils';

export class AtatContext {
  public parent: AtatContext | null;
  public tags: {
    open: RegExp;
    close: RegExp;
    inline: RegExp;
    compilers: IAtatTag[];
  };
  public parts: string[];
  public options: IAtatOptions;
  public body: string | null = null;
  public helpers: { [key: string]: AtatHelper };
  public output: string;
  public template: IAtatTemplate | null = null;
  public model: any;
  public arguments: string;
  public sections: { [key: string]: IAtatTemplate };
  public partials: IAtatTemplate[];
  public layout: IAtatTemplate | null;

  constructor(opts: IAtatOptions) {
    this.options = merge(DEFAULT_OPTIONS, opts);
    this.helpers = merge(helpers, opts.helpers);

    this.model = null;
    this.output = '';
    this.parts = [];
    this.parent = null;

    this.arguments = [this.options.it, this.options.$, 'body'].join(',');

    this.tags = tags;

    this.layout = null;
    this.partials = [];
    this.sections = {};
  }

  public getSection(name: string): IAtatTemplate | null {
    return name
      ? this.sections[name] || (this.parent && this.parent.getSection(name))
      : null;
  }

  public getCompiler(str: string) {
    for (let i = 0, l = this.tags.compilers.length; i < l; i += 1) {
      const item = this.tags.compilers[i];
      if (regexpTest(str, item.regexp)) {
        return item.compiler;
      }
    }

    return null;
  }
}
