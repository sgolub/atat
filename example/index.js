const
	express = require('express'),
	fs = require('fs'),
	atat = require('../index'),
	app = express();

app.engine('atat', atat.__express);

app.set('views',  __dirname + '/views');
app.set('view engine', 'atat');

app.get('/', (req, res, next) => {

	return res.render('index', { title: 'atat example', name: 'atat' });
});

app.listen(3000, () => {
	console.log('Node app is running on port %s', 3000);
});
