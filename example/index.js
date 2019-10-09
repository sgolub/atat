var express = require('express');
var atat = require('../lib/index');
var app = express();

app.engine('atat', atat.__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'atat');

app.get('/', function(req, res, next) {
  return res.render('index', { title: 'atat example', name: 'atat' });
});

app.listen(3000, function() {
  console.log('Node app is running on port %s', 3000);
});
