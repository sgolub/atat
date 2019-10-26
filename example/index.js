var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'atat');

app.get('/', function(req, res, next) {
  return res.render('index', { title: 'atat example', name: 'atat' });
});

app.listen(3000, function() {
  console.log('Node app is running on port %s', 3000);
});
