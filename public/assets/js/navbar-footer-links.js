let userLogged;

function addStaticLinks() {

	const homeUrl = window.location.origin;
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');
	$('#cart').attr('href', homeUrl+'/pages/cart.html');
	$('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
	$('#ordering').attr('href', homeUrl+'/pages/ordering-shipping.html');
	$('#register').attr('href', homeUrl+'/pages/login-signup.html');
	$('#closeReg').attr('href', homeUrl);

} 

//Login functions
// Get the modal
var modal = document.getElementById('id01');


function showLogin() {
  document.getElementById('id01').style.display='block';
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

function sendData() {

    var http = new XMLHttpRequest();

    var params =  "email=" + document.getElementById('inputEmail').value +
                  "&password=" + document.getElementById('inputPassword').value;

    document.getElementById('id01').style.display='none';

    // Raises and Alert with some informations and goes back to index.html!
    http.addEventListener("load", function(event) {
        let resp = JSON.parse(event.target.responseText);
        alert(`${resp.info}, ${resp.user.name}!`);
        location.reload();
    });

    // Define what happens in case of error
    http.addEventListener("error", function(event) {
        alert(event.target.responseText);
    });

    // Set up our request
    http.open("POST", "/v2/users/login", true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // The data sent is what the user provided in the form
    http.send(params);

}


function closeToggle() {
	console.log('ciao');
	var element = document.getElementById('navbar-toggle');
	element.className += ' collapsed';
	var element2 = document.getElementById('myNavbar');
	element.className = element.className.replace(' show', '');
}

function isUserLoggedIn() {

	fetch('/v2/users/isLoggedIn')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			loginOrProfile(data.user);
		});
}

function loginOrProfile (user) {
	if(user) {
		userLogged = user;
		console
		$('#isLogged').html(
			`
			<div class="dropdown">
  				<button class="btn btn-secondary dropdown-toggle userButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    			<span class="glyphicon glyphicon-user"></span>
  				</button>
			  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			    <h5 class="dropdown-item">${userLogged}</h5>
			    <h4><a class="dropdown-item" href="/pages/cart.html">Cart</a></h5>
			    <br>
			    <br>
			    <button class="dropdown-item logoutButton" type="button" onclick="logout()">Logout</button>
			  </div>
			</div>
			`
		);
	} else {
		$('#isLogged').html(
			`<button class="button login" onclick="showLogin()">Login</button>`
		);
	}
}

function showUser() {
	console.log("Show windows with user logged");

	
}

function logout() {

	fetch('/v2/users/logout')
		.then(function(response) {
			console.log('Logout successful!');
			return location.reload();
	});

	window.location.href = window.location.origin;
}



isUserLoggedIn();
addStaticLinks();