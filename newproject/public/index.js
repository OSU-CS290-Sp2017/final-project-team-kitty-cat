var title = document.getElementById('title-input');
var director = document.getElementById('director-input');
var comment = document.getElementById('comment-input');
var summary = document.getElementById('summary-input');

// storePersonPhoto(function(err){
// 		if (err){
// 			alert(err);
// 		}
// });

function onClickPlus(){
	url =window.location.href;
	url+="/plus";
	increment(url,function(err){
		if (err){
			alert(err);
		}
	});
	window.location.replace(" "+window.location.href);
}

function onClickMinus(){
	url =window.location.href;
	url+="/minus";
	increment(url,function(err){
		if (err){
			alert(err);
		}
	});
	window.location.replace(" "+window.location.href);
}

function increment(index,callback){
  var xml = new XMLHttpRequest();
  var url = index;

  xml.open("POST", url);
  xml.setRequestHeader("Content-Type", "text/plain");

  xml.addEventListener('load', function(event){
    var error;
    if(event.target.status !== 200){
      error = event.target.response;
    }
    callback(error);
  });

  var post = "qwe";

  xml.send(post);
}

function storeMovieInFile(title, comment , summary,director,callback) {

  var postURL = "/addMovie";

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    var error;
    if (event.target.status !== 200) {
      error = event.target.response;
    }
    callback(error);
  });

  var postBody = {
    title: title,
	comment : comment,
	summary:summary,
	director:director
  };

  postRequest.send(JSON.stringify(postBody));

}

function insertMovieData(){
  storeMovieData(function(err){

    var movieDataTemplate = Handlebars.templates.movie;
    var templateArgs = {
      name: title.value,
      director: director.value,
      comment: comment.value,
      plusminus: 0,
      summary: summary.value,
      id: 6
    };

    var movieHTML = movieDataTemplate(templateArgs);

    var movieSidePanel = document.getElementById('.side-panel');
    movieSidePanel.insertAdjacentHTML('beforeend', movieHTML);
  });
}

function storeMovieData(callback){
  var xml = new XMLHttpRequest();
  var url = "/addMovie";

  xml.open("POST", url);
  xml.setRequestHeader("Content-Type", "application/json");

  xml.addEventListener('load', function(event){
    var error;
    if(event.target.status !== 200){
      error = event.target.response;
    }
    callback(error);
  });

  var postJson = {
    name: title.value,
    director: director.value,
    comment: comment.value,
    plusminus: 0,
    summary: summary.value,
    id: 6
  };

  xml.send(JSON.stringify(postJson));
}

function checkTitles(){
  if(title.value === ''){
    return true;
  }else{
    return false;
  }
}

function checkFields(){
  if(!director.value || !title.value || !comment.value || !summary.value ){
    return false;
  }else{
    return true;
  }
}

function addMovie(){
  console.log("Add Movie");
  if(checkFields() === true){
    storeMovieInFile(title.value,comment.value,summary.value,director.value,function(err){
		if (err){
			alert(err);
		}else{
			alert("your movie has been added");
			window.location.replace(" http://localhost:3000/search/"+title.value);

		}
	});
    console.log("The Fields are correct ");
  }else{
    console.log("The Fields arent finished");
  }
}



function clearContent(){
  console.log("clear content");

  title.value = "";
  director.value = "";
  comment.value = "";
  summary.value = "";
}

window.addEventListener('DOMContentLoaded', function(event){

  var createMovieButton = document.getElementById('input-create');
  if(createMovieButton){
    createMovieButton.addEventListener('click', addMovie);
  }

  var plusButton = document.getElementById('plusButton');
  if (plusButton){
	plusButton.addEventListener('click',onClickPlus);

  }
  var minusButton = document.getElementById('minusButton');
  if (minusButton){
	  minusButton.addEventListener('click',onClickMinus);
  }


  var searchButton = document.getElementById('navbar-search-button');
  var searchInput = document.getElementById('navbar-search-input');

  if(searchButton){
	  searchButton.addEventListener('click',function(){
		  if (searchInput.value){
			  window.location.replace(" http://localhost:3000/search/"+searchInput.value);
		  }else{
			  window.location.replace(" http://localhost:3000/search/");
		  }
	  });
  }

  var clearContentButton = document.getElementById('input-clear');
  if(clearContentButton){
    clearContentButton.addEventListener('click', clearContent);
  }
});
