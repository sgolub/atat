import { AtatHelper, IAtatTag, IAtatTemplate } from './common';
import { get_tags, get_tags_inline, helpers, loop, merge } from './helpers';
import { inlineTags } from './inline';
import { DEFAULT_OPTIONS, IAtatOptions } from './options';
import { regexp_test } from './regexp';
import { tags } from './tags';

export class AtatContext {
  public parent: AtatContext;
  public inline: RegExp;
  public tags: { open: RegExp; close: RegExp; compilers: IAtatTag[] };
  public parts: string[];
  public options: IAtatOptions;
  public body: string;
  public helpers: { [key: string]: AtatHelper };
  public output: string;
  public template: IAtatTemplate;
  public model: any;
  public arguments: string;
  public sections: { [key: string]: IAtatTemplate };
  public partials: IAtatTemplate[];
  public layout: IAtatTemplate;

  constructor(opts: IAtatOptions) {
    this.options = merge(DEFAULT_OPTIONS, opts);
    this.helpers = merge(helpers, opts.helpers);

    this.model = null;
    this.output = '';
    this.parts = [];
    this.parent = null;

    this.arguments = [this.options.it, this.options.$, 'body'].join(',');

    this.tags = get_tags(tags);
    this.inline = get_tags_inline(inlineTags);

    loop(inlineTags, (compiler, regexp: string) => {
      this.tags.compilers.push({
        compiler,
        regexp: new RegExp(regexp, 'g'),
      });
    });

    this.layout = null;
    this.partials = [];
    this.sections = {};
  }

  public section(name: string): IAtatTemplate {
    return name
      ? this.sections[name] || (this.parent && this.parent.section(name))
      : null;
  }

  public compiler(str: string = '') {
    for (let i = 0, l = this.tags.compilers.length; i < l; i += 1) {
      const item = this.tags.compilers[i];
      if (regexp_test(str, item.regexp)) {
        return item.compiler;
      }
    }

    return null;
  }
}
