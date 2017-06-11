/*
 * Write your Express server in this file as described in README.md.
 */
//Code for Jeremy Facchetti (Onid:facchetj) (github facchettos)
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


app.get('/',function(req,res,next){
	var templateArgs ={
		twit:movieData
	};

	var bool=true;
	res.status(200).render("moviePage",{list:templateArgs,bool:bool});
});

app.get('/twit/:index',function(req,res,next){
	console.log("== url params for request:", req.params);
	var index = req.params.index;
  	var requestedTwit = movieData[index];
	var mylist = {requestedTwit};
	//console.log(movieData[index].text);

  	if (requestedTwit) {
    var templateArgs = {
		twit:mylist
    }
	var bool=false;
    res.status(200).render('twitPage', {list:templateArgs,bool:bool});
  } else {

	res.status(404).render("404Page");
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


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
	res.status(404).render("404Page");

});

app.listen(port,function(){
	console.log("Server listening on port "+ port);
})
