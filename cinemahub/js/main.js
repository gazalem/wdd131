import * as ApiService from './apiservice.js';

// Date and Time Display
const currentYear = document.getElementById("current-year");
const currentDate = new Date();
currentYear.textContent = currentDate.getFullYear();


// Hamburger Menu Toggle
const hamburgerMenu = document.getElementsByClassName("hamburgerMenu")[0]
const mobileMenuWrapper = document.getElementsByClassName("mobileMenuWrapper")[0]

hamburgerMenu.addEventListener("click", showMobileMenu)

function showMobileMenu() {
  mobileMenuWrapper.classList.toggle("clicked");
  hamburgerMenu.classList.toggle("fa-xmark");
  hamburgerMenu.classList.toggle("fa-bars");
  document.body.classList.toggle("blockScroll");
}



const posterSize = 'w342'; // Size of the poster images

/*
* Function to generate a random integer between min and max, inclusive.
* @param {number} [min=1] - The minimum value (inclusive).
* @param {number} max - The maximum value (inclusive).
* @returns {number} A random integer between min and max.
* @throws {Error} If max is not provided or is less than min.
* @example
* const randomNumber = random(1, 10);
* console.log(randomNumber); // Output: A random integer between 1 and 10
*/
function random(min=1, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let allGenres = [];

function getGenreNames(genreIds) {
  if (!genreIds || genreIds.length === 0) {
    return 'N/A';
  }
  return genreIds.map(id => {
    const genre = allGenres.find(g => g.id === id);
    return genre ? genre.name : '';
  }).filter(name => name).join(', ');
}

function movieTemplate(movie) {
  return `
    <div class="movie-card">
      <img src="${ApiService.imageSecureBaseUrl}${posterSize}${movie.poster_path}" alt="${movie.title} Poster">
      <h2>${movie.title}</h2>
      <p>
        <strong>Release Date:</strong> ${movie.release_date ? movie.release_date : 'N/A'}<br>
        <strong>Language:</strong> ${movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}<br>
        <strong>Genre(s):</strong> ${getGenreNames(movie.genre_ids)}<br>
        <i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(2)}
      </p>
    </div>`
};


function renderMovies(movies) {
  const movieContainer = document.querySelector('.movie-grid');
  movieContainer.innerHTML = ''; // Clear existing skeletons
  movies.forEach(movie => {
    const movieHtml = movieTemplate(movie);
    movieContainer.innerHTML += movieHtml;
  });
}




function getUniqueGenres(movies) {
  const allGenreIds = movies.flatMap(movie => movie.genre_ids);
  const uniqueGenreIds = [...new Set(allGenreIds)];
  return uniqueGenreIds.map(id => {
    return allGenres.find(g => g.id === id);
  }).filter(genre => genre); // Filter out any undefined genres
}

let allTrendingMovies = [];

function renderGenreFilters(genres) {
  const filtersContainer = document.querySelector('.filters');
  filtersContainer.innerHTML = '<button class="active" data-genre-id="all" aria-label="Show all movies">All</button>'; // Clear and add All button

  // Check for movies with no genre and add N/A button if needed
  const hasMoviesWithNoGenre = allTrendingMovies.some(movie => !movie.genre_ids || movie.genre_ids.length === 0);
  if (hasMoviesWithNoGenre) {
    const button = document.createElement('button');
    button.textContent = 'N/A';
    button.setAttribute('aria-label', 'Show movies with no genre');
    button.dataset.genreId = 'na';
    filtersContainer.appendChild(button);
  }

  genres.forEach(genre => {
    const button = document.createElement('button');
    button.textContent = genre.name;
    button.setAttribute('aria-label', `Show ${genre.name} movies`);
    button.dataset.genreId = genre.id;
    filtersContainer.appendChild(button);
  });

  filtersContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const genreId = event.target.dataset.genreId;
      
      // Toggle active class
      document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      if (genreId === 'all') {
        renderMovies(allTrendingMovies);
      } else if (genreId === 'na') {
        const filteredMovies = allTrendingMovies.filter(movie => !movie.genre_ids || movie.genre_ids.length === 0);
        renderMovies(filteredMovies);
      } else {
        const filteredMovies = allTrendingMovies.filter(movie => movie.genre_ids.includes(parseInt(genreId)));
        renderMovies(filteredMovies);
      }
    }
  });
}

const searchForm = document.querySelector('.searchBar'); 
const searchInput = searchForm.querySelector('.searchInputBox');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    const movies = await ApiService.searchMovies(query);
    renderMovies(movies);

    const uniqueGenres = getUniqueGenres(movies);
    renderGenreFilters(uniqueGenres);
    // document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  }
});

async function Main() {
  allGenres = await ApiService.getMovieGenres();
  allTrendingMovies = await ApiService.trendingMovies();
  renderMovies(allTrendingMovies);

  const uniqueGenres = getUniqueGenres(allTrendingMovies);
  renderGenreFilters(uniqueGenres);
}

Main();
