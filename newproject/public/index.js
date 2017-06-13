var title = document.getElementById('title-input');
var director = document.getElementById('director-input');
var comment = document.getElementById('comment-input');
var summary = document.getElementById('summary-input');

// storePersonPhoto(function(err){
// 		if (err){
// 			alert(err);
// 		}
// });

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
  if(director.value === '' || comment.value === '' || summary.value === '' || checkTitles() === true){
    return false;
  }else{
    return true;
  }
}

function addMovie(){
  console.log("Add Movie");
  if(checkFields() === true){
    storeMovieInFile(title.value,comment.value,summary.value,director.value,function(err){
		alert("hello");
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

  var clearContentButton = document.getElementById('input-clear');
  if(clearContentButton){
    clearContentButton.addEventListener('click', clearContent);
  }
});
