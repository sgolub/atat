
export = atat;

declare interface atat {
	compileByPath(path: string, callback?: AtatCallback<AtatTemplate>): void;
	compileByPath(path: string, opts?: AtatOptions, callback?: AtatCallback<AtatTemplate>): void;
	compile(template: string, callback?: AtatCallback<AtatTemplate>): void;
	compile(template: string, opts?: AtatOptions, callback?: AtatCallback<AtatTemplate>): void;
}

interface AtatOptions {
	modelname?: string;
	helpersname?: string;
	basePath?: string;
	helpers?: {
		[key: string]: AtatHelper;
	};
}

type AtatCallback<T> = (err?: any, result?: T) => void;

type AtatHelper = (...args: any[]) => string;

type AtatTemplate = {
	(model: any): string;
};
