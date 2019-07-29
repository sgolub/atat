import { AtatHelper, IAtatTag, IAtatTemplate } from './common';
import { IAtatOptions } from './options';
export declare class AtatContext {
    parent: AtatContext;
    inline: RegExp;
    tags: {
        open: RegExp;
        close: RegExp;
        compilers: IAtatTag[];
    };
    parts: string[];
    options: IAtatOptions;
    body: string;
    helpers: {
        [key: string]: AtatHelper;
    };
    output: string;
    template: IAtatTemplate;
    model: any;
    arguments: string;
    sections: {
        [key: string]: IAtatTemplate;
    };
    partials: IAtatTemplate[];
    layout: IAtatTemplate;
    constructor(opts: IAtatOptions);
    section(name: string): IAtatTemplate;
    compiler(str?: string): import("./common").AtatCompileFunction;
}
