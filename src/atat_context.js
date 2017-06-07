class AtContext {
	constructor(opts) {

		this.options = merge(Atat.options, opts);

		this.output = '';

		this.model = null;
		this.helpers = this.options.helpers;

		this.parts = [];

		this.arguments = [
			this.options.modelname,
			this.options.helpersname,
			'body'
		].join(',');

		this.tags = get_tags(this.options.tags);
		this.inline = get_tags_inline(this.options.inline);

		this.tags.compilers = [];

		loop(this.options.tags, (compiler, regexp) => {
			this.tags.compilers.push({
				compiler: compiler,
				regexp: new RegExp(regexp, 'g')
			});
		});

		loop(this.options.inline, (compiler, regexp) => {
			this.tags.compilers.push({
				compiler: compiler,
				regexp: new RegExp(regexp, 'g')
			});
		});

		this.__layout = null;
		this.__partials = [];
		this.__sections = {};

		this.parent = null;
	}

	section(name) {
		if (!name) {
			return null;
		}

		return this.__sections[name] || (this.parent && this.parent.section(name));
	}

	compiler(str = '') {

		for (let i = 0, l = this.tags.compilers.length; i < l; i++) {
			let item = this.tags.compilers[i];
			if (regexp_test(str, item.regexp)) {
				return item.compiler;
			}
		}

		return null;
	}
}
