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


// Get the modal
var modal1 = document.getElementById("registrationModal");

// Get the button that opens the modal
var btn1 = document.getElementById("btnRegistration");

// When the user clicks on the button, open the modal 
btn1.onclick = function() {
  modal1.style.display = "block";
}













