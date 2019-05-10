console.log('JS script for ordering-shipping');

document.getElementById("freeShipping").innerHTML = "Your order will ship with Standard Shipping unless you select an alternative. If you don't receive a shipping confirmation email right away, don't worry! We will deliver the items to you by the delivery date shown or within the date range provided at checkout. We do not ship Saturdays, Sundays, or holidays. If your order requires additional information to fully process, we will be in touch by email.";

document.getElementById("shippingCosts").innerHTML = "Your order will ship with Standard Shipping unless you select an alternative. If you don't receive a shipping confirmation email right away, don't worry! We will deliver the items to you by the delivery date shown or within the date range provided at checkout. We do not ship Saturdays, Sundays, or holidays. If your order requires additional information to fully process, we will be in touch by email.";

document.getElementById("internationalShipping").innerHTML = "Your order will ship with Standard Shipping unless you select an alternative. If you don't receive a shipping confirmation email right away, don't worry! We will deliver the items to you by the delivery date shown or within the date range provided at checkout. We do not ship Saturdays, Sundays, or holidays. If your order requires additional information to fully process, we will be in touch by email.";

document.getElementById("whatToKnow").innerHTML = "Your order will ship with Standard Shipping unless you select an alternative. If you don't receive a shipping confirmation email right away, don't worry! We will deliver the items to you by the delivery date shown or within the date range provided at checkout. We do not ship Saturdays, Sundays, or holidays. If your order requires additional information to fully process, we will be in touch by email.";

function addStaticLinks() {

	console.log('Adding static links.');

	const homeUrl = window.location.origin;
	// const homeUrl = '../index.html';
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
}

addStaticLinks();