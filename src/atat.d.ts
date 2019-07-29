import { AtatCallback, IAtatTemplate } from './common';
import { IAtatOptions } from './options';
export declare const atat: {
    config(opts: IAtatOptions): void;
    parse(input: string, optionsArg?: IAtatOptions | AtatCallback<IAtatTemplate>, callbackArg?: AtatCallback<IAtatTemplate>): Promise<unknown>;
    loadAndParse(path: string, optionsArg?: IAtatOptions | AtatCallback<IAtatTemplate>, callbackArg?: AtatCallback<IAtatTemplate>): void | Promise<IAtatTemplate>;
    render(input: string, model?: any, optionsArg?: IAtatOptions | AtatCallback<string>, callbackArg?: AtatCallback<string>): Promise<unknown>;
    loadAndRender(path: string, model: any, optionsArg?: IAtatOptions | AtatCallback<string>, callbackArg?: AtatCallback<string>): Promise<unknown>;
    __express(path: string, options: any, callback: (err?: any, res?: string) => any): void;
};
