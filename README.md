# atat<sup>β</sup>

Fast and simple asynchronous JavaScript template engine without dependencies for any environment.

[![Build Status](https://travis-ci.org/sgolub/atat.svg?branch=master)](https://travis-ci.org/sgolub/atat)

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

### Features

 - Embeded JavaScript code
 - Browser support
 - Complies with Express
 - Layouts, partials and sections

### Usage


```js
var atat = require('atat');
```

```js
atat.compile(templateString, helpers, function(err, template) {
    if (!err) {
        var result = template(model);
    }
});
```

or you can use ```compileByPath``` method to read template from file or download it by ajax request

```js
atat.compileByPath(templateUri, helpers, function(err, template) {
    if (!err) {
        var result = template(model);
    }
});
```

### Syntax

Encoded output
```html
<p>@(it.user.firstName)@</p>
```

Raw html
```html
<p>@!(it.rawHTML)@</p>
```

Embedded JavaScript code
```html
@{
    var now = Date.now();
}@

<p>@(now)@</p>
```

@if statement
```html
@if(it.user){
    <p>@(it.user.firstName)@</p>
    <p>@(it.user.secondName)@</p>
}@
```

@if...else statement
```html
@if(it.user){
    <p>@(it.user.firstName)@</p>
    <p>@(it.user.secondName)@</p>
} else {
    <p>User is not defined</p>
}@
```

@for statement
```html
<ul>
@for(var i = 0, l = it.users.length; i < l; i++>){
    <li>@(it.users[i].firstName)@ @(it.users[i].secondName)@</li>
}@
</ul>
```

@while statement
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

### Layout

### Patrial

### Section

### ExpressJS Integration

### Testing

## License
The JavaScript Templates script is released under the [MIT license](https://opensource.org/licenses/MIT).