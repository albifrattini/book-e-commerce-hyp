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

            <div class="row">
                <div class="col">
                    <h2>
                        ${author.authorName}
                    </h2>
                </div>
            </div>
            <div class="row book-cover">
                <div class="col-lg-5">
                    <img src="${author.profileUrl}" alt="${author.authorName} cover" width="200" height="310">
                </div>
                <div class="col-lg-7">
                    <div>
                        <p>${author.authorBiography}</p>
                        
                    </div>
                </div>

        </div>
        `
    );

}

getAuthorDetails();












