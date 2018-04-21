import { AtatOptions, AtatDefaultOpions } from "./options";
import { AtatHelper, AtatTemplate, AtatCompileFunction, AtatTag } from "./common";
import { helpers, merge, get_tags, get_tags_inline, loop, resolveUrl } from "./helpers";
import { regexp_test } from "./regexp";
import { inline_tags } from "./inline";
import { tags } from "./tags";

export class AtatContext {

	parent: AtatContext;
	inline: RegExp;
	tags: { open: RegExp; close: RegExp; compilers: AtatTag[]; };
	parts: string[];
	options: AtatOptions;
	body: string;
	helpers: { [key: string]: AtatHelper };
	output: string;
	template: AtatTemplate;
	model: any;
	arguments: string;
	sections: { [key: string]: AtatTemplate };
	partials: AtatTemplate[];
	layout: AtatTemplate;

	constructor(opts: AtatOptions) {

		this.options = merge(AtatDefaultOpions, opts);
		this.helpers = merge(helpers, opts.helpers);

		this.model = null;
		this.output = '';
		this.parts = [];
		this.parent = null;

		this.arguments = [this.options.modelname, this.options.helpersname, 'body'].join(',');

		this.tags = get_tags(tags);
		this.inline = get_tags_inline(inline_tags);

		loop(inline_tags, (compiler, regexp: string) => {
			this.tags.compilers.push({
				compiler: compiler,
				regexp: new RegExp(regexp, 'g')
			});
		});

		this.layout = null;
		this.partials = [];
		this.sections = {};
	}

	section(name: string): AtatTemplate {
		return name ? this.sections[name] || (this.parent && this.parent.section(name)) : null;
	}

	compiler(str: string = "") {

		for (let i = 0, l = this.tags.compilers.length; i < l; i++) {
			let item = this.tags.compilers[i];
			if (regexp_test(str, item.regexp)) {
				return item.compiler;
			}
		}

		return null;
	}
}
