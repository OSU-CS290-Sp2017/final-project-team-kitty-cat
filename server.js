var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var movieTitles = require('./movieTitles.json');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){
	console.log("///==Directory==///");

	var templateArgs = {
		name: movieTitles.Movies.name,
		review: movieTitles.Movies.review,
		rating: movieTitles.Movies.rating
	};

	var start = false;
	res.render('moviePage', {list:templateArgs, start:start});
	next();
});

app.get('/movies/:titles', function(req, res, next){
	var titles = req.params.titles;
	console.log("///==" + titles.name + "==///");;
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
	res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function(){
	console.log("///=== Server Listening: ", port);
});
