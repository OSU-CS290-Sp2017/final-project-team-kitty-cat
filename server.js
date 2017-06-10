var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = requrie('express-handlebars');

var moveTitle = require('./movieTitles.json');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res, next){
	console.log("///==Directory==///");
	next();
});

app.get('/:titles', function(req, res, next){
	var titles = req.params.titles;
	console.log("///==" + titles.name + "==///");;
	next();
});

app.use(express.static(path.join(__dirnam, 'public')));

//app.get('*', function(req, res));

app.listen(port, function(){
	console.log("///=== Server Listening: " + port);
}
