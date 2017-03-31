const
	express = require('express'),
	fs = require('fs'),
	app = express();

app.engine('html', require('./../index').__express);

app.set('views', './views');
app.set('view engine', 'html');

app.get('/', (req, res, next) => {

	return res.render('index', { title: 'Atat example', name: 'Atat' });
});

app.listen(3000, () => {
	console.log('Node app is running on port %s', 3000);
});
