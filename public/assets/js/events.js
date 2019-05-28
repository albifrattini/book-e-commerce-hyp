function getEvents() {
	$('#eventsShown').html("");
	fetch("/v2/events")
		.then(function(response){
			return response.json();
		})
		.then(function(events){
			events.map(showEvents);
		});
}

function getEventsByMonth(month) {
	$('#eventsShown').html("");
	fetch(`/v2/events/filter?month=${month}`)
		.then(function(response) {
			return response.json();
		})
		.then(function (events) {
			events.map(showEvents);
		});
}

function showEvents(event) {
	$('#eventsShown').append(
		` 	
			
				 <div class="col-md-6 col-sm-6">
			      <div class="polaroid">
			        <div class="singlEventContainer">  
				        <a href="/pages/event-detail.html?id=${event.id}">
				            <img src="${event.imageUrl}" alt="${event.eventName} cover" 
				             class="imgEvent">	

				            <div class="overlay">
				            	<div class="overlayText">
				            		<p class="textFont">${event.eventLocation}</p>
				            		<p "textFont">${event.eventDate.substring(0,10)}</p>
				            	</div>
				    		</div>              	
				        </a>
			        </div>

			        <div class="titleEventContainer">
			            <h4 class="text-center textFont">${event.eventName}</h4>
			        </div>
			       </div>
			     </div>
			
		
	       
		`
	);
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btnFilter");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("btnFilter active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

getEvents();


