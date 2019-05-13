function sendData() {

	var http = new XMLHttpRequest();

	var params = 	"name=" + document.getElementById('inputName').value +
    				"&email=" + document.getElementById('inputEmail').value +
    				"&password=" + document.getElementById('inputPassword').value;

    document.getElementById('registerForm').reset();

    // Raises and Alert with some informations and goes back to index.html!
    http.addEventListener("load", function(event) {
    	let resp = JSON.parse(event.target.responseText);
		alert(`${resp.info}\nWelcome to Libreggiamo, ${resp.user.name}!\nLogin through the Profile button.`);
		window.location.href = window.location.origin;
    });

    // Define what happens in case of error
    http.addEventListener("error", function(event) {
      	alert(event.target.responseText);
    });

    // Set up our request
    http.open("POST", "/v2/users/signUp", true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // The data sent is what the user provided in the form
    http.send(params);

}

function addStaticLinks() {

	const homeUrl = window.location.origin;

	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');

}

addStaticLinks();












