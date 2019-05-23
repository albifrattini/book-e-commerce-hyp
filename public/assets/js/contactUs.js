// JS script for contactUs page

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
