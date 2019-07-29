export = atat;

declare interface atat {
  config(opts: AtatOptions): void;

  parse(
    path: string,
    options: AtatOptions,
    callback: AtatCallback<AtatTemplate>,
  ): void;
  parse(path: string, callback: AtatCallback<AtatTemplate>): void;
  parse(path: string, options: AtatOptions): Promise<AtatTemplate>;
  parse(path: string): Promise<AtatTemplate>;

  loadAndParse(
    path: string,
    options: AtatOptions,
    callback: AtatCallback<AtatTemplate>,
  ): void;
  loadAndParse(path: string, callback: AtatCallback<AtatTemplate>): void;
  loadAndParse(path: string, options: AtatOptions): Promise<AtatTemplate>;
  loadAndParse(path: string): Promise<AtatTemplate>;

  render(
    path: string,
    model: any,
    options: AtatOptions,
    callback: AtatCallback<string>,
  ): void;
  render(path: string, model: any, callback: AtatCallback<string>): void;
  render(path: string, model: any, options: AtatOptions): Promise<string>;
  render(path: string, model: any): Promise<string>;

  loadAndRender(
    path: string,
    model: any,
    options: AtatOptions,
    callback: AtatCallback<string>,
  ): void;
  loadAndRender(path: string, model: any, callback: AtatCallback<string>): void;
  loadAndRender(
    path: string,
    model: any,
    options: AtatOptions,
  ): Promise<string>;
  loadAndRender(path: string, model: any): Promise<string>;
}

interface AtatOptions {
  it?: string;
  $?: string;
  basepath?: string;
  cache?: boolean;
  helpers?: {
    [key: string]: AtatHelper;
  };
}

type AtatCallback<T> = (err?: any, result?: T) => void;

type AtatHelper = (...args: any[]) => string;

type AtatTemplate = (model: any) => string;
