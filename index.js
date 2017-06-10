var movieTitleButtons = document.getElementsByClassName('tag-buttons');
var titleDescriptionElem = document.getElementsByClassName('movie-title-display');


function moveToBio(event){
  var titleName = event.currentTarget.textContent;
  titleDescriptionElem.textContent = titleName;
  console.log("//==== Title: ",titleName);
}

for(var i = 0; i < titleDescriptionElem.length; i++){
  titleDescriptionElem[i].addEventListener('click', moveToBio);
  console.log(i);
}


console.log("hello");
