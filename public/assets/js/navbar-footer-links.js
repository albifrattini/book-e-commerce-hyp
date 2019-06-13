let userLogged;

function addStaticLinks() {

	const homeUrl = window.location.origin;
	$('#home').attr('href', homeUrl);
	$('#homeBread').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#eventsBread').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');
	$('#booksBread').attr('href', homeUrl+'/pages/books.html');
	$('#cart').attr('href', homeUrl+'/pages/cart.html');
	$('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
	$('#ordering').attr('href', homeUrl+'/pages/ordering-shipping.html');
	$('#register').attr('href', homeUrl+'/pages/login-signup.html');
	$('#closeReg').attr('href', homeUrl);
	$('#authors').attr('href', homeUrl+'/pages/author.html');

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

			    <h5 class="dropdown-item textFont">${userLogged}</h5>

			    <h4><a class="dropdown-item textFont" href="/pages/cart.html" id="cartLink">Cart</a></h5>
			    
			    <button class="dropdown-item logoutButton" type="button" onclick="logout()">Logout</button>
			  </div>
			  
			</div>
			`
		);
	} else {
		$('#isLogged').html(
			`<button class="button login" onclick="window.location.href='/pages/login-signup.html'">Login</button>`
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