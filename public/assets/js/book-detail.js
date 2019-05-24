
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

let isbn = URL.ISBN;
console.log(isbn);

function getBookDetails() {

    fetch(`/v2/books/${isbn}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayBook(data);
    });

}

function displayBook(book) {

    $('#book').append(
        `

            <div class="row">
                <div class="text-center">
                    <h3>
                        ${book.title}
                    </h3>
                    <hr style="max-width: 1000px;">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <img src="${book.coverUrl}" alt="${book.title} cover" id="bookCover">
                    <h5>
                        by <a href="/pages/author-detail.html?id=${book.authorId}">${book.authorName}</a>
                    </h5>
                </div>
                <div class="col-md-6">
                    <div>
                        <p>${book.description}</p>
                        <p>Published by: ${book.publisher}</p>
                        <p>${book.price} €</p>
                        <h5>Availability: ${book.status}</h5>
                        <div style="margin-top: 50px;"></div>
                        <div class="row">
                            <div class="col-lg-2">
                                <input type="button" name="addToCart" class="btn btn-primary" value="Add to cart">
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        `
    );

}

getBookDetails();












