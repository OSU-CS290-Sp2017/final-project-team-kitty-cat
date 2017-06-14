var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var port =  process.env.port || 3000;
var app = express();
var movieData = require("./movieData");
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var styleFile = fs.readFileSync('./public/style.css');
var jsFile = fs.readFileSync('./public/index.js');
var template = fs.readFileSync('./public/movieTemplate.js')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
console.log(movieData.length);


app.get('/createMoviePage', function(req,res,next){
	res.render("createMoviePage",{add:true});
});


app.get('/',function(req,res,next){

	var stocklist = movieData;
	stocklist.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  stocklist.slice(0,5);

	var templateArgs ={
		twit:sideMovies
	};
	var bool=true;
	res.status(200).render("homePage",{list:templateArgs,bool:bool,home:true});
});

app.get('/movie/:index',function(req,res,next){
	console.log("== url params for request:", req.params);

	var index = req.params.index;
	var mylist;
	var requestedMovie;
	var stocklist = movieData;
	stocklist.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  stocklist.slice(0,5);
	for (i=0; i<movieData.length;i++){
		if (movieData[i].id==index){
			requestedMovie = movieData[i];
			mylist={requestedMovie }
		}
	}
	//console.log(movieData[index].text);
	// console.log(movieData);

	if (mylist) {
		var templateArgs = {
			twit:mylist
		};
		var templateArgsSide = {
			twit:sideMovies
		};
		console.log(templateArgsSide);
		var bool=false;
		res.status(200).render('moviePage', {list:templateArgs,sidelist:templateArgsSide,bool:bool,home:true,});
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
	var requestedMovie;
	// var requestedMovie = movieData[index];
	var stockList=movieData;
	stockList.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  stockList.slice(0,5);
	var mylist = {requestedMovie};
	//console.log(movieData[index].text);
	for (i =0 ; i<movieData.length;i++){
		if (movieData[i].id==index){
			requestedMovie = movieData[i];
			mylist={requestedMovie }
		}
	}


	if (mylist) {
		var templateArgs = {
			twit:mylist
		};
		var templateArgsSide={
			twit:sideMovies
		};
		var bool=false;
		res.status(200).render('moviePageRand', {list:templateArgs,sidelist:templateArgsSide,bool:bool,random:true,});
	}  else {
		res.status(404).render('404Page');
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/',function(req,res,next){
	movieData = require('./movieData');

	var result = [];
	for (i = 0;i<movieData.length;i++){
			result.push(movieData[i]);
	}
	var templateArgs={
		twit:result
	};
	console.log(templateArgs);
	var stockList=movieData;
	stockList.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  stockList.slice(0,5);
	var templateArgsSide = {
		twit:sideMovies
	};
	res.status(200).render('searchResult', {results :templateArgs ,sidelist:templateArgsSide,home:true,})
});


app.get('/search/:search',function(req,res,next){
	movieData = require('./movieData');
	var search = req.params.search;
	var result = [];
	for (i = 0;i<movieData.length;i++){
		if (movieData[i].title.includes(search)){

			result.push(movieData[i]);
			console.log("found");
			console.log(movieData[i]);
		}
	}
	console.log('results are :');
	console.log(result);
	var templateArgs={
		twit:result
	};
	console.log(templateArgs);
	var stockList=movieData;
	stockList.sort(function(a,b){return b.plusminus - a.plusminus});
	var sideMovies =  stockList.slice(0,5);
	var templateArgsSide = {
		twit:sideMovies
	};
	res.status(200).render('searchResult', {results :templateArgs ,sidelist:templateArgsSide,home:true,})
});

app.get('*', function (req, res) {
	res.status(404).render("404Page",{home:true,});

});

app.post('/movie/:index/plus',function (req,res,next){
	var id=req.params.index;
	movieData = require('./movieData');
	for (i=0;i<movieData.length;i++){
		if(movieData[i].id == id){
			movieData[i].plusminus = movieData[i].plusminus + 1;
		}
	}
	fs.writeFile('movieData.json', JSON.stringify(movieData), function (err) {
		if (err) {
			res.status(500).send("Unable to increment plus minus.");
		} else {
			console.log("toto");
			res.status(200).send();
		}

	});
});

app.post('/movie/:index/minus',function (req,res,next){
	var id=req.params.index;
	movieData = require('./movieData');
	for (i=0;i<movieData.length;i++){
		if(movieData[i].id == id){
			movieData[i].plusminus--;
		}
	}
	fs.writeFile('movieData.json', JSON.stringify(movieData), function (err) {
		if (err) {
			res.status(500).send("Unable to decrement plus minus.");
		} else {
			res.status(200).send();
		}

	});
});





app.post('/addMovie', function (req, res, next) {
	var array = movieData;
	var newMovie =
	{	title:req.body.title,
		comment:req.body.comment,
		summary:req.body.summary,
		director:req.body.director};
	// console.log(JSON.stringify(newMovie));
	newMovie.id=movieData.length;
	newMovie.plusminus=0;
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
	console.log(movieData[1]);
});
