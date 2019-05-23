function addStaticLinks() {

	console.log('Adding static links.');

	const homeUrl = window.location.origin;
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');
	$('#contactUs').attr('href', homeUrl+'/pages/contactUs.html');
	$('#ordering').attr('href', homeUrl+'/pages/ordering-shipping.html');

} 

addStaticLinks();