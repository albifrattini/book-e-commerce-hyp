function addStaticLinks() {

    console.log('Adding static links.');

    const homeUrl = window.location.origin;
    
    $('#home').attr('href', homeUrl);
    $('#events').attr('href', homeUrl+'/pages/events.html');
    $('#books').attr('href', homeUrl+'/pages/books.html');
    console.log('Here');
}

addStaticLinks();