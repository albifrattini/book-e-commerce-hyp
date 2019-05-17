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
		<div class="column">
			<div class="card">
                <a href="/pages/event.html?id=${event.id}">
                	<img src="/assets/img/agatha.jpg" alt="${event.eventName} cover" style="width:100%">
                </a>
                <p>${event.eventName}</p>
            </div>
         </div>
		`
	);
}


addStaticLinks();
getEvents();