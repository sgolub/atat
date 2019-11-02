[![Build Status](https://github.com/sgolub/atat/workflows/build/badge.svg)](https://github.com/sgolub/atat/actions)

# αtαt

Fast and simple asynchronous JavaScript template engine without dependencies and for any environment (:

## But why?

I wanted to create something simple for what you don't need to spend hours to read the documentation, something that you can start to use in a few minutes. The main idea is using pure JavaScript with pure HTML. You don't need to learn new syntax, just do everything like in JavaScript.

## Features

- Embedded JavaScript code
- Browser support
- Complies with Express
- Layouts, partials and sections
- No dependencies and very small size
- TypeScript support
- Easy to use

## Installation

Using yarn or npm:

```bash
$ yarn add atat
$ npm install --save atat
```

## Tests

Using npm or bower:

```bash
$ yarn test
$ npm test
```

## Usage

```js
import { config, parse, loadAndRender, render, loadAndParse } from 'atat';

var atat = require('atat');
```

`atat` object has the following methods

- `config` to setup global configuration for all templates
- `parse` to parse a template, returns a render function
- `loadAndParse` the same with `parse` but allows a path to a template as the first argument
- `render` to parse and render a template, returns the result string
- `loadAndRender` the same with `render` but allows a path to a template as the first argument

```js
import { parse, loadAndRender, render, loadAndParse } from 'atat';

const render = await parse(templateString, options);
container.innerHTML = render(model);

container.innerHTML = await render(templateString, model, options);

const render = await loadAndParse(pathToTemplate, options);
container.innerHTML = render(model);

container.innerHTML = await loadAndRender(pathToTemplate, model, options);
```

If your environment doesn't support `async/await` sytax, use `Promise`

```js
render(templateString, options).then((err, result) => {
  container.innerHTML = result;
});
```

### Options

- `it` models variable name, default `"it"`
- `$` helpers variable name, default `"$"`
- `helpers` extra helpers
- `loader` templates provider

```js
import { parse, render, config, DEFAULT_LOADER } from 'atat';
const options = {
    it: "it",
    $: "$",
    helpers: { },
    loader: DEFAULT_LOADER
};

// global config will be applied to all templates
config(options);

// also you can pass options to the parse and render methods
const tmpl = await parse(templateString, options);
const html = await render(templateString, { lang: "en" }, options);
```

### Loaders

Loaders allow you to load templates asynchronously. There are two default loaders available right from the library:
- `DEFAULT_LOADER` - for Node.js, default loader, uses `fs` module
- `FETCH_LOADER` - for Browser, loads templates through `fetch` method

```js
import { loadAndRender, loadAndParse, config, FETCH_LOADER, DEFAULT_LOADER } from 'atat';

const html = await loadAndRender(
  path.resolve(__dirname, './views/main.html'),
  { /* model */ },
  { loader: DEFAULT_LOADER },
);

// in a browser you must specify loader, at least FETCH_LOADER
const html = await loadAndRender(
  'http://localhost:3000/views/main.html',
  { /* model */ },
  { loader: FETCH_LOADER },
);

// custom loader
config({
  loader: async (path) => {
    const template = await loadTemplate(path);
    return template;
  }
});
```

### Syntax

Encoded output

```html
<p>@(it.user.firstName)@</p>
<p>@encode(it.user.firstName)@</p>

<!-- 
  Model: { user: { firstName: 'William' } }
  Output:
  <p>William</p>
 -->
```

Raw html output

```html
<p>@!(it.rawHTML)@</p>

<!-- 
  Model: { rawHTML: '<i>Hello!</i>' }
  Output:
  <p><i>Hello!</i></p>
 -->
```

Embedded JavaScript code

```html
@{
  // Any JavaScript code is acceptable in this block
  const { firstName, secondName } = it.user;
}@

<p>@(firstName)@ @(secondName)@</p>

<!-- 
  Model: { user: { firstName: 'William', secondName: 'Smith' } }
  Output:
  <p>William Smith</p>
 -->
```

**@if**

```html
@if (it.user != null) {
<p>@(it.user.firstName)@</p>
<p>@(it.user.secondName)@</p>
}@

<!-- 
  Model: { user: { firstName: 'William', secondName: 'Smith' } }
  Output:
  <p>William</p>
  <p>Smith</p>
 -->
```

**@if...else if...else**

```html
@if(it.user && it.user.firstName && it.user.secondName){
<p>@(it.user.firstName)@</p>
<p>@(it.user.secondName)@</p>
} else if (it.user && it.user.firstName) {
<p>@(it.user.firstName)@</p>
} else {
<p>User is not defined</p>
}@

<!-- 
  Model: { user: { firstName: 'William', secondName: '' } }
  Output:
  <p>William</p>
 -->
```

**@for**

```html
<ul>
  @for(var i = 0, l = it.users.length; i < l; i++){
  <li>@(it.users[i].firstName)@ @(it.users[i].secondName)@</li>
  }@
</ul>

<!-- 
  Model: { users: [{ firstName: 'William', secondName: 'Smith' }] }
  Output:
  <ul>
    <li>William Smith</li>
  </ul>
 -->
```

**@while**

```html
<ul>
  @{ var i = 0; j = 5; }@
  @while (i < j) {
  <li>@(i++)@</li>
  }@
</ul>

<!-- 
  Output:
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
 -->
```

### Helpers

#### Custom helper

`@<name>(<args...>)@`

- `name` the valid name
- `args...` whatever you want

```js
const options = {
    $: '$',
    helpers: {
      l10n: (lang, key) => resources[lang][key];
    }
};

const result = await atat.render(template, model, options);
```

```html
<title>@l10n(it.lang, "title")@</title>
<title>@('My Website - ' + $.l10n(it.lang, "title"))@</title>

<!-- 
  Model: { lang: 'en' }
  Output:
  <title>Main page</title>
  <title>My Website - Main page</title>
 -->
```

#### Default helpers

- `@json(<object>)@` returns a result of JSON stringify
- `@encode(<string>)@` the same as `@(<string>)@`
- `@join(<array>, <separator>)@` joins the array with the separator (optional)
- `@upper(<string>)@` simple uppercase
- `@lower(<string>)@` simple lowercase

### Layout

`@layout(<path>)@`

- `path` the path to the layout file

**index.atat**

```html
@layout('/views/_layout.atat')@
<div class="page-container">
  Home page!
</div>
```

**/views/\_layout.atat**

```html
<html>
  <head></head>
  <body>
    <main>
      @!(body)@
    </main>
  </body>
</html>
```

Output:

```html
<html>
  <head></head>
  <body>
    <main>
      <div class="page-container">
        Home page!
      </div>
    </main>
  </body>
</html>
```

### Patrial

Patrials allow you to reuse useful pieces of code in different places

`@partial(<path>, <model>)@`

- `path` path to partial a view file
- `model` model for a partial view (optional)

**views/\_menu.atat**

```html
<nav role="main">
  <ul>
    <li>
      <a href="/" class="@(it.page=='home'?'active':'')@">Home</a>
    </li>
    <li>
      <a href="/about" class="@(it.page=='home'?'active':'')@">About</a>
    </li>
  </ul>
</nav>
```

**views/\_layout.atat**

```html
@{ const { $route } = it; }@
<html>
  <head></head>
  <body>
    @partial('/views/_menu.atat', $route)@
    <main>
      @!(body)@
    </main>
  </body>
</html>
```

Output:

```html
<html>
  <head></head>
  <body>
    <nav role="main">
      <ul>
        <li>
          <a href="/" class="active">Home</a>
        </li>
        <li>
          <a href="/about" class="">About</a>
        </li>
      </ul>
    </nav>
    <main>
      <!-- Home page content -->
    </main>
  </body>
</html>
```

### Section

Section allows you to pass HTML markup from a view to a layout level

Use the following syntax to specify a new section

```html
@section script {
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // your code is here
  });
</script>
}@
```

and another one to output the result anywhere

`@section(<name>)@`

- `name` sections name

**index.atat**

```html
@layout('/views/_layout.atat')@
<div class="page-container">
  Home page!
</div>
@section script {
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // your code is here
  });
</script>
}@
```

**/views/\_layout.atat**

```html
<html>
  <head></head>
  <body>
    <main>
      @!(body)@
    </main>
    @section('script')@
  </body>
</html>
```

Output:

```html
<html>
  <head></head>
  <body>
    <main>
      <div class="page-container">
        Home page!
      </div>
    </main>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // your code is here
      });
    </script>
  </body>
</html>
```

### ExpressJS Integration

Just set `'view engine'` value to `atat`

```js
const express = require('express');

const app = express();

app.set('views', './views');
app.set('view engine', 'atat');
```
Example available [here](https://github.com/sgolub/atat/tree/master/example)

### Demo

Coming soon...

## License

The JavaScript Templates script is released under the [MIT license](https://opensource.org/licenses/MIT).
