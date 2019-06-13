function sendFormData() {

	var http = new XMLHttpRequest();

	var params = 	"name=" + document.getElementById('registerName').value +
    				"&email=" + document.getElementById('registerEmail').value +
    				"&password=" + document.getElementById('registerPassword').value;

    // Raises and Alert with some informations and goes back to index.html!
    http.addEventListener("load", function(event) {
    	let resp = JSON.parse(event.target.responseText);
		alert(`${resp.info}\nWelcome to Libreggiamo, ${resp.user.name}!\nLogin through the Profile button.`);
    });

    // Define what happens in case of error
    http.addEventListener("error", function(event) {
      	alert(event.target.responseText);
    });

    // Set up our request
    http.open("POST", "/v2/users/signUp", true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.setRequestHeader('Content-type', 'application/json');

    // The data sent is what the user provided in the form
    http.send(params);

    document.getElementById("registerForm").reset();

}

function sendData() {

    var http = new XMLHttpRequest();

    var params =  "email=" + document.getElementById('inputEmail').value +
                  "&password=" + document.getElementById('inputPassword').value;


    // Raises and Alert with some informations and goes back to index.html!
    http.addEventListener("load", function(event) {
        let resp = JSON.parse(event.target.responseText);
        alert(`${resp.info}, ${resp.user.name}!`);
        window.location = window.location.origin;
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













