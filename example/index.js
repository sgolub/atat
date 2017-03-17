const
	express = require('express'),
	fs = require('fs'),
	app = express();

app.engine('atat', require('./../index').__express);

app.set('views', './views');
app.set('view engine', 'atat');

app.get('/', (req, res, next) => {

	return res.render('index', { name: 'Atat' });
});

app.listen(3000, () => {
	console.log('Node app is running on port %s', 3000);
});
