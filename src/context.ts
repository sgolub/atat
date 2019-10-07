import { AtatHelper, IAtatTag, IAtatTemplate } from './common';
import { getTags, getTagsInline, helpers, loop, merge } from './helpers';
import { inlineTags } from './inline';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { regexpTest } from './regexp';
import { tags } from './tags';

export class AtatContext {
  public parent: AtatContext | null;
  public inline: RegExp;
  public tags: { open: RegExp; close: RegExp; compilers: IAtatTag[] };
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

    this.tags = getTags(tags);
    this.inline = getTagsInline(inlineTags);

    loop(inlineTags, (compiler, regexp: string | number) => {
      this.tags.compilers.push({
        compiler,
        regexp: new RegExp(regexp as string, 'g'),
      });
    });

    this.layout = null;
    this.partials = [];
    this.sections = {};
  }

  public section(name: string): IAtatTemplate | null {
    return name
      ? this.sections[name] || (this.parent && this.parent.section(name))
      : null;
  }

  public compiler(str: string = '') {
    for (let i = 0, l = this.tags.compilers.length; i < l; i += 1) {
      const item = this.tags.compilers[i];
      if (regexpTest(str, item.regexp)) {
        return item.compiler;
      }
    }

    return null;
  }
}
