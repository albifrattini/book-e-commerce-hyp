function addStaticLinks() {

    console.log('Adding static links.');

    const homeUrl = window.location.origin;
    
    $('#home').attr('href', homeUrl);
    $('#events').attr('href', homeUrl+'/pages/events.html');
    $('#books').attr('href', homeUrl+'/pages/books.html');
}

function getEvents() {
	fetch("/v2/events")
		.then(function(response){
			return response.json();
		})
		.then(function(events){
			events.map(showEvents);
		});
}

function showEvents(event) {
	$('#eventsShown').append(
		` 	
				 <div class="col-md-6">
					<div class="titleEventContainer">
			            <h3 class="text-center">${event.eventName}</h3>
			        </div>
			        
			        <div class="singlEventContainer">  
				        <a href="/pages/event.html?id=${event.id}">
				            <img src="${event.imageUrl}" alt="${event.eventName} cover" 
				             class="imgEvent" style="width:100%; ">	

				            <div class="overlay">
				            	<div class="overlayText">
				            		<p>${event.eventLocation}</p>
				            		<p>${event.eventDate.substring(0,10)}</p>
				            	</div>
				    		</div>              	
				        </a>
			        </div>
			     </div>
		
	       
		`
	);
}

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

// Show filtered elements
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

addStaticLinks();
getEvents();