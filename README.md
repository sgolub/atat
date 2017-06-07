# atat

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

### Options

 - ```modelname``` default to ```it```
 - ```helpersname``` default to ```$```
 - 
 - 
 - 

### Usage


```js
var Atat = require('atat');
```

```js
Atat.compile(templateString, options, function(err, template) {
    if (!err) {
        var result = template(model);
    }
});
```

or you can use ```compileUri``` method to read template from file or download it by ajax request

```js
Atat.compileUri(templateUri, options, function(err, template) {
    if (!err) {
        var result = template(model);
    }
});
```

### Syntax

### Helpers

### Layout

### Patrial

### Section

### ExpressJS Integration

### Testing

### License
MIT