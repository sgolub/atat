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
	}

	compiler(left, right) {
		return this.options.tags[left + '...' + right] ||
			this.options.inline[left + '...' + right];
	}
}
