var URL = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

let id = URL.id;

function getAuthorDetails() {

    fetch(`/v2/authors/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayAuthor(data[0]);
            data.map(displayWrittenBooks);
    });

}


function displayAuthor(author) {

    $('#author').append(
        `
            <h3 class="text-center textFont">${author.authorName}</h3>
            <hr style="max-width: 1000px;">
            <div class="container">
                <img src="${author.profileUrl}" alt="${author.authorName} cover" style="width:100%">
                <hr style="max-width: 1000px;">
                <p class="textFont">
                ${author.presentation}
                    <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#demo">  
                        show more
                    </button>
                <div id="demo" class="collapse">
                    ${author.authotBiography}
                </div>
                </p>
            </div>              
        `
    );
}

function displayQuotes(author) {
    $('#quotes').append(
        `
            <h3 class="text-center textFont">Best Quotes</h3>
            <hr style="max-width: 1000px;">
            <div>${author.quote}</div>
        `
        );
}

getAuthorDetails();












