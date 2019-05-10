// JS script for books page

console.log('Building books main page...');

function addStaticLinks() {

	console.log('Adding static links.');

	const homeUrl = window.location.origin;
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
	$('#orderingShipping').attr('href', homeUrl+'/pages/orderingShipping.html');
}

