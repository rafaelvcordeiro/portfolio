
/////////////////////////////////////////////////////////////
/////  Function to show or hide DIVs panel in general   /////
/////  when is defined as off, it will stop at a        /////
/////  minimum height, wont completeley disappear       /////
/////////////////////////////////////////////////////////////

 function expandOtherDiv(element) {
  const panelID = element.id + "Target"
  const panel = document.getElementById(element.id+"Target");
  if (panel.className == "expandOtherDivOff") {
    panel.className = "expandOtherDivOn";
  } else {
    panel.className = "expandOtherDivOff";
  }
}


/////////////////////////////////////////////////////////////
/////  Function to show or hide DIVs panel in general   /////
/////  similar to previous function, mas just turns on  /////
/////  or off.                                          /////
/////////////////////////////////////////////////////////////

function hideOtherDiv(element) {
  const panelID = element.id + "Target"
  const panel = document.getElementById(element.id+"Target");
  if (panel.style.display == "none") {
    panel.style.display = "inline-block";
  } else {
    panel.style.display = "none";
  }
}



/////////////////////////////////////////////////////////////
/////  Function to show or hide DIVs panel in general   /////
/////  similar to previous function, mas just turns on  /////
/////  or off.                                          /////
/////////////////////////////////////////////////////////////
function detailsExpand() {
    const element = document.getElementById("details-page");
    if (element.className == "desligado") {
      element.className = "ligado";
    } else {
      element.className = "desligado";
    }
  }



//////////////////////////////////////////////////////////////////
/////       function to show or hide the details panel       /////
//////////////////////////////////////////////////////////////////
////   DATA to copy: record_id,user_id,Genres,Title,Rating,  /////
////   Duration,Type,Platform,Trailer,Country,Writer,Cast,   /////
////   Poster,Watched,Plot,Comment,Year                      /////
//////////////////////////////////////////////////////////////////

function showDetails(selectedItem) {
  // Get specific movie attributes from the current selected item
  const detailsPage = document.getElementById("details-page");
  let dId = selectedItem.getAttribute("dId")
  let dFields = selectedItem.getAttribute("dFields")
  let dTitle = selectedItem.getAttribute("dTitle")
  let dRating = selectedItem.getAttribute("dRating")
  let dDuration = selectedItem.getAttribute("dDuration")
  let dType = selectedItem.getAttribute("dType")
  let dPlatform = selectedItem.getAttribute("dPlatform")
  let dTrailer = selectedItem.getAttribute("dTrailer")
  let dCountry = selectedItem.getAttribute("dCountry")
  let dWriter = selectedItem.getAttribute("dWriter")
  let dCast = selectedItem.getAttribute("dCast")
  let dPoster = selectedItem.getAttribute("dPoster")
  let dWatched = selectedItem.getAttribute("dWatched")
  let dPlot = selectedItem.getAttribute("dPlot")
  let dComment = selectedItem.getAttribute("dComment")
  let dYear = selectedItem.getAttribute("dYear")

  // If movie trailer is empty, hide that section
  if (dTrailer == "") {
    document.getElementById("divTrailer").className = "desligado";
  }
  else {
    document.getElementById("divTrailer").className = "ligado";   
  }

  // If details tab is closed, open it
  if (detailsPage.className == "desligado") {  
    detailsPage.className = "ligado";
    document.getElementById("recordIdEdit").value = dId;
    document.getElementById("recordIdDelete").value = dId;
    document.getElementById("recordIdWatched").value = dId;
    document.getElementById("dFields").innerHTML = dFields;
    document.getElementById("dTitle").innerHTML = dTitle;
    document.getElementById("dRating").innerHTML = dRating;
    document.getElementById("dDuration").innerHTML = dDuration;
    document.getElementById("dType").innerHTML = dType;
    document.getElementById("dPlatform").innerHTML = dPlatform;
    document.getElementById("dTrailer").src = dTrailer;
    document.getElementById("dCountry").innerHTML = dCountry;
    document.getElementById("dWriter").innerHTML = dWriter;
    document.getElementById("dCast").innerHTML = dCast;
    document.getElementById("dPoster").src = dPoster;
    document.getElementById("dWatched").innerHTML = dWatched;
    document.getElementById("dPlot").innerHTML = dPlot;
    document.getElementById("dComment").innerHTML = dComment;
    document.getElementById("dYear").innerHTML = dYear;
    
  // If details tab is already opened, close it first, wait 0.75 s and call the function again, to open it, with new info
  } else if (detailsPage.className == "ligado") {  
    detailsPage.className = "desligado";
    //turn off trailer from playing in the background
    document.getElementById("dTrailer").innerHTML = "";
    const myTimeout = setTimeout(function () {showDetails(selectedItem);}, 750);
  }
}







////////////////////////////////////////////////////////////////
/////   Image carousel                                     /////
/////   source: https://splide1js.com/tutorials/gallery/    /////
////////////////////////////////////////////////////////////////

var splide1 = new Splide("#main-slider1", {
  width: 600,
  height: 300,
  pagination: false,
  cover: true
});

var thumbnails1 = document.getElementsByClassName("thumbnail t1");
var current1;

for (var i = 0; i < thumbnails1.length; i++) {
  initThumbnail(thumbnails1[i], i);
}

function initThumbnail(thumbnail1, index) {
  thumbnail1.addEventListener("click", function () {
    splide1.go(index);
  });
}

splide1.on("mounted move", function () {
  var thumbnail1 = thumbnails1[splide1.index];

  if (thumbnail1) {
    if (current1) {
      current1.classList.remove("is-active");
    }

    thumbnail1.classList.add("is-active");
    current1 = thumbnail1;
  }
});

splide1.mount();





var splide2 = new Splide("#main-slider2", {
  width: 600,
  height: 300,
  pagination: false,
  cover: true
});

var thumbnails2 = document.getElementsByClassName("thumbnail t2");
var current2;

for (var i = 0; i < thumbnails2.length; i++) {
  initThumbnail(thumbnails2[i], i);
}

function initThumbnail(thumbnail2, index) {
  thumbnail2.addEventListener("click", function () {
    splide2.go(index);
  });
}

splide2.on("mounted move", function () {
  var thumbnail2 = thumbnails2[splide2.index];

  if (thumbnail2) {
    if (current2) {
      current2.classList.remove("is-active");
    }

    thumbnail2.classList.add("is-active");
    current2 = thumbnail2;
  }
});

splide2.mount();










