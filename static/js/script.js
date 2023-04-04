
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







/////////////////////////////////////////////////////////////////////////////
/////   Image Lightbox                                                  /////
/////   source: https://www.w3schools.com/howto/howto_js_lightbox.asp   /////
/////////////////////////////////////////////////////////////////////////////

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


/////////////////////////////////////////////////////////////////////////////
/////   Image Lightbox 2                                                  /////
/////   source: https://www.w3schools.com/howto/howto_js_lightbox.asp   /////
/////////////////////////////////////////////////////////////////////////////

// Open the Modal
function openModal2() {
  document.getElementById("myModal2").style.display = "block";
}

// Close the Modal
function closeModal2() {
  document.getElementById("myModal2").style.display = "none";
}

var slideIndex2 = 1;
showSlides2(slideIndex2);

// Next/previous controls
function plusSlides2(n2) {
  showSlides2(slideIndex2 += n2);
}

// Thumbnail image controls
function currentSlide2(n2) {
  showSlides2(slideIndex2 = n2);
}

function showSlides2(n2) {
  var i2;
  var slides2 = document.getElementsByClassName("mySlides2");
  var dots2 = document.getElementsByClassName("demo2");
  var captionText2 = document.getElementById("caption2");
  if (n2 > slides2.length) {slideIndex2 = 1}
  if (n2 < 1) {slideIndex2 = slides2.length}
  for (i2 = 0; i2 < slides2.length; i2++) {
    slides2[i2].style.display = "none";
  }
  for (i2 = 0; i2 < dots2.length; i2++) {
    dots2[i2].className = dots2[i2].className.replace(" active", "");
  }
  slides2[slideIndex2-1].style.display = "block";
  dots2[slideIndex2-1].className += " active";
  captionText2.innerHTML = dots2[slideIndex2-1].alt;
}


/////////////////////////////////////////////////////////////////////////////
/////   Image Lightbox 3                                                  /////
/////   source: https://www.w3schools.com/howto/howto_js_lightbox.asp   /////
/////////////////////////////////////////////////////////////////////////////

// Open the Modal
function openModal3() {
  document.getElementById("myModal3").style.display = "block";
}

// Close the Modal
function closeModal3() {
  document.getElementById("myModal3").style.display = "none";
}

var slideIndex3 = 1;
showSlides3(slideIndex3);

// Next/previous controls
function plusSlides3(n3) {
  showSlides3(slideIndex3 += n3);
}

// Thumbnail image controls
function currentSlide3(n3) {
  showSlides3(slideIndex3 = n3);
}

function showSlides3(n3) {
  var i3;
  var slides3 = document.getElementsByClassName("mySlides3");
  var dots3 = document.getElementsByClassName("demo3");
  var captionText3 = document.getElementById("caption3");
  if (n3 > slides3.length) {slideIndex3 = 1}
  if (n3 < 1) {slideIndex3 = slides3.length}
  for (i3 = 0; i3 < slides3.length; i3++) {
    slides3[i3].style.display = "none";
  }
  for (i3 = 0; i3 < dots3.length; i3++) {
    dots3[i3].className = dots3[i3].className.replace(" active", "");
  }
  slides3[slideIndex3-1].style.display = "block";
  dots3[slideIndex3-1].className += " active";
  captionText3.innerHTML = dots3[slideIndex3-1].alt;
}



