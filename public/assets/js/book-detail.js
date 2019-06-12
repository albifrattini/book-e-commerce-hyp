
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
let book;
let authors;

function getBookDetails() {

    fetch(`/v2/books/${isbn}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            book = data;
        })
        .then(function () {
            fetch(`/v2/books/${isbn}/authors`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    authors = data;
                    displayBook();
                    if(authors.length > 1) addOtherAuthors();
                });
        })
        .then(function() {
            fetch(`/v2/books/${isbn}/similar`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displaySimilarBooks(data);
                });
        })
        .then(function() {
            fetch(`/v2/books/${isbn}/reviews`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    startReviewSection();
                    data.map(displayBookReviews);
                });
        })
        .then(function() {
            fetch(`/v2/books/${isbn}/events`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    startEventsSection();
                    data.map(displayEvents);
                });
        });


}

function addOtherAuthors() {
    for (var i = 1; i < authors.length; i++) {
        $('#bookAuthors').append(
            `
                    , <a href="/pages/author-detail.html?id=${authors[i].authorId}">${authors[1].authorName}</a>
            `
        );
    }
}

function displayBook() {

    $('#book').append(
        `

            <div class="row">
                <div class="text-center">
                    <h3 class="textFont">
                        ${book.title}
                    </h3>
                    <hr style="max-width: 1000px;">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <img src="${book.coverUrl}" alt="${book.title} cover" id="bookCover">
                    <h5 class="textFont" style="padding-left:20px;" id="bookAuthors">
                        by <a href="/pages/author-detail.html?id=${authors[0].authorId}">${authors[0].authorName}</a>
                    <h5>
                </div>
                <div class="col-md-6 col-sm-6">
                    <div>
                        <p class="textFont">${book.description}</p>
                        <p class="textFont"><b>Published by:</b> ${book.publisher}</p>
                        <p class="textFont">${book.price} €</p>
                        <h5 class="textFont"><b>Availability:</b> ${book.status}</h5>
                        <div style="margin-top: 50px;"></div>
                        <div class="row">
                            <div class="col-lg-2">
                                <input type="button" name="addToCart" class="btn btn-primary" value="Add to cart" onclick="addToCart()">
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        `
    );

}



function displayEvents(event) {
    
    $('#eventsOfBook').append(
        `   
            
                 <div class="col-md-6 col-sm-6">
                  <div class="polaroid">
                    <div class="singlEventContainer">  
                        <a href="/pages/event-detail.html?id=${event.id}">
                            <img src="${event.imageUrl}" alt="${event.eventName} cover" 
                             class="imgEvent">  

                            <div class="overlay">
                                <div class="overlayText textFont">
                                    <h3 class="textFont" style="font-weight: bold">${event.eventLocation}</h3>
                                    <h3 class="textFont">${event.eventDate.substring(0,10)}</h3>
                                </div>
                            </div>                  
                        </a>
                    </div>

                    <div class="titleEventContainer textFont">
                        <h4 class="text-center textFont">${event.eventName}</h4>
                    </div>
                   </div>
                 </div>
            
        
           
        `
    );

}

function displaySimilarBooks(books) {
    $('#similarBooks').append(
        `
            <div class="row">
                <div class="text-center">
                    <h3 class="textFont">
                        Similar Books
                    </h3>
                    <hr style="max-width: 1000px;">
                </div>
            </div>
            <div style="margin-bottom: 20px"></div>
        `
    );
    for (var i = 0; i < books.length/4; i++) {
        $('#similarBooks').append('<div class="row">');
        for (var j = 0; j < 4; j++) {
            var index = i*4+j;
            if (index < books.length) {
                $('#similarBooks').append(
                    `
                    
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="polaroid" >
                            <a href="/pages/book-detail.html?ISBN=${books[index].ISBN}"><img src="${books[index].coverUrl}" alt="${books[index].title} cover" style="width:100%" height="auto"></a>
                            <p class="price text-center textFont" style="color: black; padding: 5px">
                            ${books[index].title}<br>
                            ${books[index].price} €</p>
                        </div>
                    </div>
                    
                    
                    `
                );
            }
        }
        $('#similarBooks').append('</div>');
    }
}

function startReviewSection() {
    $('#bookReviews').append(
        `
            <div class="row">
                <div class="text-center">
                    <h3 class="textFont">
                        Book Reviews
                    </h3>
                    <hr style="max-width: 1000px;">
                </div>
            </div>
            <div style="margin-bottom: 20px"></div>
        `
    );
}

function startEventsSection() {
    $('#eventsOfBook').append(
        `
            <div class="row">
                <div class="text-center">
                    <h3 class="textFont">
                        Presentation Events
                    </h3>
                    <hr style="max-width: 1000px;">
                </div>
            </div>
            <div style="margin-bottom: 20px"></div>
        `
    );
}

function displayBookReviews(review) {

    $('#bookReviews').append(
        `
            <div class="row">
                <div class="col-sm-2 col-md-2">
                    <div class="text-center">
                        <img src="/assets/img/avatar.png" alt="${review.reviewer}" class="avatar">
                    </div>
                </div>
                <div class="col-sm-10 col-md-10">
                    <h4 class="textFont">${review.reviewer}</h4>
                    <div id="rating"></div>
                    <br>
                    <p class="textFont">${review.description}</p>
                </div>
            </div>
            <hr>
        `
    );

    insertStarRating(review.rating);
}

function insertStarRating(rating) {

    for (var i = 0; i < 5; i++) {

        if(i < rating) {
            $('#rating').append(
                `
                    <span class="fa fa-star checked"></span>
                `
            );
        } else {
            $('#rating').append(
                `
                    <span class="fa fa-star"></span>
                `
            );
        }
    }
}

function addToCart() {

    if (!userLogged) return alert('You cannot add an element in the cart without logging in first!');

    const book = {ISBN: `${isbn}`};

    fetch(`/v2/cart/add?isbn=${isbn}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(answer) {
            alert(`The books with ISBN = ${isbn} has been added to your cart!`);
        });
}

getBookDetails();












