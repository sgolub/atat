import { AtatHelper } from "./common";

export interface AtatOptions {
	it?: string;
	$?: string;
	basepath?: string;
	cache?: boolean;
	helpers?: {
		[key: string]: AtatHelper;
	};
}

export const AtatDefaultOpions: AtatOptions = {
	it: "it",
	$: "$",
	basepath: "",
	cache: true,
	helpers: {}
};
