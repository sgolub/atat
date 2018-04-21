import { AtatHelper } from "./common";

export interface AtatOptions {
	modelname?: string;
	helpersname?: string;
	basePath?: string;
	helpers?: {
		[key: string]: AtatHelper;
	};
}

export const AtatDefaultOpions: AtatOptions = {
	modelname: "it",
	helpersname: "$",
	basePath: "",
	helpers: {}
};