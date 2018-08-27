# atat<sup>β</sup>

Fast and simple asynchronous JavaScript template engine without dependencies and for any environment (:

[![Build Status](https://travis-ci.org/sgolub/atat.svg?branch=master)](https://travis-ci.org/sgolub/atat)

## But why?
I wanted to create something simple for what you don't need to spend hours to read the documentation, something that you can start to use in a few minutes. The main idea is using pure JavaScript with pure HTML. You don't need to learn new syntax, just do everything like in JavaScript.

## Features

 - Embedded JavaScript code
 - Browser support
 - Complies with Express
 - Layouts, partials and sections
 - No dependencies and very small size, less than 12KB
 - Easy to use, you won't believe how simple it is

## Installation

Using npm or bower:
```bash
$ npm install --save atat
$ bower install --save atat
```

In a browser:
```html
<script type="text/javascript" src="path_to/dist/atat.min.js"></script>
```

## Usage


```js
import atat from 'atat';

var atat = require('atat');
```

```atat``` object has the following methods

 * ```config``` global configuration for all templates
 * ```parse``` parse a template, returns a render function
 * ```loadAndParse``` the same with ```parse``` but allows a path to template as the first argument
 * ```render``` parse and render a templare, returns the result string
 * ```loadAndRender``` the same with ```render``` but allows a path to template as the first argument

```js
const render = await atat.parse(templateString, options);
container.innerHTML = render(model);

container.innerHTML = await atat.render(templateString, model, options);

const render = await atat.loadAndParse(pathToTemplate, options);
container.innerHTML = render(model);

container.innerHTML = await atat.loadAndRender(pathToTemplate, model, options);
```
If your environment doesn't support ```async/await``` sytax, use ```Promise```

```js
atat.render(templateString, options).then((err, result) => {
    container.innerHTML = result;
});
```

either your environment doesn't support ```Promise```, all methods support the classic callback style

```js
atat.parse(templateString, options, function (err, render) {
    if (!err) {
        const result = render(model);
        container.innerHTML = result;
    }
});
```

### Options
 * ```it``` models variable name, default ```"it"```
 * ```$``` helpers variable name, default ```"$"```
 * ```basepath``` base path
 * ```helpers``` extra helpers

```js
const options = {
    it: "it", // the name of the model variable
    $: "$",
    basepath: "./views",
    cache: true, // will be available soon
    helpers: {
        l10n: (lang, key) => l10n.resources[lang][key]; // @l10n(it.lang, "title")@
    }
};

// global config will be applied to all templates
atat.config(options);

// also you can pass options into the parse or render methods
atat.parse(templateString, options);
atat.render(templateString, { lang: "en" }, options);
```


### Syntax

Encoded output
```html
<p>@(it.user.firstName)@</p>
<p>@encode(it.user.firstName)@</p>
```

Raw html output
```html
<p>@!(it.rawHTML)@</p>
```

Embedded JavaScript code
```html
@{
  // Any JavaScript code is acceptable in this block
  const now = new Date();
}@

<p>@(now)@</p>
```

**@if**
```html
@if(it.user != null){
    <p>@(it.user.firstName)@</p>
    <p>@(it.user.secondName)@</p>
}@
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
```

**@for**
```html
<ul>
@for(var i = 0, l = it.users.length; i < l; i++>){
    <li>@(it.users[i].firstName)@ @(it.users[i].secondName)@</li>
}@
</ul>
```

**@while**
```html
<ul>
    @{
        var i = 0; j = 10;
    }@

    @while(i < j){
        <li>@(i++)@</li>
    }@
</ul>
```

### Helpers

```@<name>(<args...>)@```

 * ```name``` the valid name
 * ```args...``` whatever you want

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
```

#### Default helpers
 * ```@json(<object>)@``` returns a result of JSON stringify
 * ```@encode(<string>)@``` the same with ```@(<string>)@```
 * ```@join(<array>, <separator>)@``` joins the array with the separator
 * ```@upper(<string>)@``` simple uppercase
 * ```@lower(<string>)@``` simple lowercase

### Layout

```@layout(<path>)@```

 * ```path``` the path to the layout file

**index.atat**
```html
@layout('/views/_layout.atat')@
<div>
  Home page!
</div>
```

**/views/_layout.atat**
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
    <div>
        Home page!
    </div>
  </main>
</body>
</html>
```

### Patrial
Patrials allow you to reuse useful pieces of code in different places

```@partial(<path>, <model>)@```
 * ```path``` path to partial a view file
 * ```model``` model for a partial view (optional)

**views/_menu.atat**
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

**views/_layout.atat**
```html
@{
  const { $route } = it;
}@
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

Use followed syntax to specify a new section

```
@section <name> {
  <html>
}@
```

and another one to output the result anywhere

```@section(<name>)@```

 * ```name``` sections name

**index.atat**
```html
@layout('/views/_layout.atat')@
<div>
  Home page!
</div>
@section script {
  <script>
      document.addEventListener("DOMContentLoaded", function () {
          // your code is here
      });
  </script>
}@
```

**/views/_layout.atat**
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
    <div>
        Home page!
    </div>
  </main>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      // your code is here
    });
  </script>
</body>
</html>
```

### ExpressJS Integration

Just set ```'view engine'``` value to ```atat```

```js
const express = require('express');

const app = express();

app.set('views', './views');
app.set('view engine', 'atat');
```

### Demo

## License
The JavaScript Templates script is released under the [MIT license](https://opensource.org/licenses/MIT).