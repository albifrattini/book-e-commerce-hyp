function addStaticLinks() {

    console.log('Adding static links.');

    const homeUrl = window.location.origin;
    
    $('#home').attr('href', homeUrl);
    $('#events').attr('href', homeUrl+'/pages/events.html');
    $('#books').attr('href', homeUrl+'/pages/books.html');
    $('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
    $('#ordering').attr('href', homeUrl+'/pages/ordering-shipping.html');
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
  var dots = document.getElementsByClassName("dot");
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
}

//Login functions
// Get the modal
var modal = document.getElementById('id01');

function showLogin() {
  document.getElementById('id01').style.display='block';
  // $('#myNavBar').attr('class', 'collapse navbar-collapse');
}

function closeLogin() {
  document.getElementById('id01').style.display='none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



addStaticLinks();