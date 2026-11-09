const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const resultsSection = document.querySelector("#results");
const loadingText = document.querySelector("#loading");

let movies = [];

function displayMovies() {
  resultsSection.innerHTML = movies
    .map(function (movie) {
      const poster =
        movie.Poster === "N/A"
          ? "https://placehold.co/180x260?text=No+Image"
          : movie.Poster;
      return `
        <article class="movie">
          <img src="${poster}" alt="${movie.Title} poster">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        </article>
      `;
    })
    .join("");
}

const API_KEY="3395f192";
searchForm.addEventListener("submit", async function (event){
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm === ""){
        return;
    }
loadingText.hidden = false;
resultsSection.classList.add
("buffering");
const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
);


const data = await response.json();
loadingText.hidden = true;

resultsSection.classList.remove("buffering");
if (data.Response === "True"){
    movies = data.Search;
    apiOrder = data.Search.slice();
    displayMovies();
} else{
    resultsSection.innerHTML = `<p>${data.Error}</p>`;
}
});


let apiOrder = [];

sortSelect.addEventListener("change", function () {
  const choice = sortSelect.value;
  if (choice === "default") {
    movies = apiOrder.slice();
  } else if (choice === "title") {
    movies.sort(function (a, b) {
      return a.Title.localeCompare(b.Title);
    });
  } else if (choice === "year") {
    movies.sort(function (a, b) {
      return parseInt(b.Year.slice(0, 4), 10) - parseInt(a.Year.slice(0, 4), 10);
    });
  }
  displayMovies();
});