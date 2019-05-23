var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}



//Import books
function retrieveBooks() {
  fetch("/v2/books?limit=4")
    .then(function(response){
      return response.json();
    })
    .then(function(books){
      books.map(showBooks);
      books.map(displayBooks);
    });
}

function showBooks(book) {
  $('#favourite').append(
    `
      <div class="column">
        <div class="card">
          <a href="/pages/book-detail.html?ISBN=${book.ISBN}">
            <img src="${book.coverUrl}" alt="${book.title} cover" style="width:120%;">
          </a>
          <p class="price">${book.price} €</p>
        </div>
      </div>
    `
  );
}

function displayBooks(book) {
  $('#best').append(
    `
      <div class="column">
        <div class="card">
          <a href="/pages/book-detail.html?ISBN=${book.ISBN}">
            <img src="${book.coverUrl}" alt="${book.title} cover" style="width:120%;">
          </a>
          <p class="price">${book.price} €</p>
        </div>
      </div>
    `
  );
}

retrieveBooks();

