function addStaticLinks() {

	console.log('Adding static links.');

	const homeUrl = window.location.origin;
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');
	$('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
	$('#ordering').attr('href', homeUrl+'/pages/ordering-shipping.html');

} 

//Login functions
// Get the modal
var modal = document.getElementById('id01');

function showLogin() {
  document.getElementById('id01').style.display='block';
  // closeToggle();
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

function closeToggle() {
	console.log('ciao');
	var element = document.getElementById('navbar-toggle');
	element.className += ' collapsed';
	var element2 = document.getElementById('myNavbar');
	element.className = element.className.replace(' show', '');
}



addStaticLinks();