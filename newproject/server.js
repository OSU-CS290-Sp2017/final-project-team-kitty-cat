/*
 * Write your Express server in this file as described in README.md.
 */
//
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var port = 3000|| process.env.port;
var app = express();
var movieData = require("./movieData");

var styleFile = fs.readFileSync('./public/style.css');
var jsFile = fs.readFileSync('./public/index.js');
var template = fs.readFileSync('./public/movieTemplate.js')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
console.log(movieData.length);



app.get('/',function(req,res,next){

	console.log(movieData);
	movieData.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  movieData.slice(0,5);
	var templateArgs ={
		twit:sideMovies
	};

	var bool=true;
	res.status(200).render("homePage",{list:templateArgs,bool:bool});
});

app.get('/movie/:index',function(req,res,next){
	console.log("== url params for request:", req.params);

	var index = req.params.index;
	var requestedMovie = movieData[index];
	var mylist = {requestedMovie};
	//console.log(movieData[index].text);

	if (requestedMovie) {
		var templateArgs = {
			twit:mylist
		};
		var bool=false;
		res.status(200).render('moviePage', {list:templateArgs,bool:bool,});
	}  else {
		res.status(404).render('404Page');
	}

});


app.get('/style.css', function(req,res){
	res.writeHead(200,{"Content-type":"text/css"});
	res.write(styleFile);
	res.end();
});

app.get('/index.js', function(req,res){
	res.writeHead(200,{"Content-type":"text/javascript"});
	res.write(jsFile);
	res.end();
})

app.get('/twitTemplate.js', function(req,res){
	res.writeHead(200,{"Content-type":"text/javascript"});
	res.write(template);
	res.end();
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/random',function(req,res){

	var length = movieData.length;
	var index=getRandomInt(0,length-1);
	var requestedMovie = movieData[index];
	var mylist = {requestedMovie};
	//console.log(movieData[index].text);

	if (requestedMovie) {
		var templateArgs = {
			twit:mylist
		};
		var bool=false;
		res.status(200).render('moviePage', {list:templateArgs,bool:bool,});
	}  else {
		res.status(404).render('404Page');
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
	res.status(404).render("404Page");

});


app.post('/addMovie', function (req, res, next) {
	var array = movieData;
	var newMovie = {title:"asd",comment:"trololo"};
	// console.log(JSON.stringify(newMovie));
	newMovie.id=movieData.length;
	// console.log(newMovie);
	// console.log("\n\n",movieData);
	movieData.push(newMovie)
	fs.writeFile('movieData.json', JSON.stringify(movieData), function (err) {
        if (err) {
          res.status(500).send("Unable to save photo to \"database\".");
        } else {
          res.status(200).send();
        }
      });
});




app.listen(port,function(){
	console.log("Server listening on port "+ port);
});
