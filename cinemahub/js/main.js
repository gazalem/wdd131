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

function movieTvShowsTemplate(item) {
  return `
    <div class="movie-card" data-movie-id="${item.id}">
      <img src="${ApiService.imageSecureBaseUrl}${posterSize}${item.poster_path}" alt="${item.title} Poster">
      <h2>${item.title === undefined ? item.name : item.title}</h2>
      <p>
        <strong>Release Date:</strong> ${item.release_date ? item.release_date : item.first_air_date}<br>
        <strong>Language:</strong> ${item.original_language ? item.original_language.toUpperCase() : 'N/A'}<br>
        <strong>Genre(s):</strong> ${getGenreNames(item.genre_ids)}<br>
        <i class="fa-solid fa-star"></i> ${item.vote_average.toFixed(2)}
      </p>
    </div>`
};


function renderMoviesTvShows(movies) {
  const movieContainer = document.querySelector('.movie-grid');
  movieContainer.innerHTML = ''; // Clear existing skeletons
  movies.forEach(movie => {
    const movieHtml = movieTvShowsTemplate(movie);
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

let allTrendingMoviesTvShows = [];

function renderGenreFilters(genres) {
  const filtersContainer = document.querySelector('.filters');
  filtersContainer.innerHTML = '<button class="active" data-genre-id="all" aria-label="Show all movies">All</button>'; // Clear and add All button

  // Check for movies with no genre and add N/A button if needed
  const hasMoviesWithNoGenre = allTrendingMoviesTvShows.some(movie => !movie.genre_ids || movie.genre_ids.length === 0);
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
        renderMoviesTvShows(allTrendingMoviesTvShows);
      } else if (genreId === 'na') {
        const filteredMovies = allTrendingMoviesTvShows.filter(movie => !movie.genre_ids || movie.genre_ids.length === 0);
        renderMoviesTvShows(filteredMovies);
      } else {
        const filteredMovies = allTrendingMoviesTvShows.filter(movie => movie.genre_ids.includes(parseInt(genreId)));
        renderMoviesTvShows(filteredMovies);
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
    const movies = await ApiService.searchMoviesTvShows(query);
    renderMoviesTvShows(movies);

    const uniqueGenres = getUniqueGenres(movies);
    renderGenreFilters(uniqueGenres);
    // document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  }
});

function renderModal(item) {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <img src="${ApiService.imageSecureBaseUrl}w500${item.poster_path}" alt="${item.title} Poster">
    <div>
      <h2>${item.title === undefined ? item.name : item.title}</h2>
      <p><strong>Tagline:</strong> ${item.tagline || 'N/A'}</p>
      <p><strong>Overview:</strong> ${item.overview}</p>
      <p><strong>Release Date:</strong> ${item.release_date || item.first_air_date}</p>
      ${item.runtime ? `
      <p><strong>Runtime:</strong> ${item.runtime} minutes</p>
      ` : `
      <p><strong>Number of Episodes:</strong> ${item.number_of_episodes}</p>
      `}
      <p><strong>Genres:</strong> ${item.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Vote Average:</strong> ⭐ ${item.vote_average.toFixed(2)}</p>
    </div>
  `;
  document.getElementById('movie-modal').style.display = 'block';
}

const movieGrid = document.querySelector('.movie-grid');
const modal = document.getElementById('movie-modal');
const closeButton = document.querySelector('.close-button');
const platform = document.getElementById('platform').textContent.trim();
console.log(`Platform: ${platform}`); // Log the platform for debugging

movieGrid.addEventListener('click', async (event) => {
  const card = event.target.closest('.movie-card');
  if (card) {
    const movieId = card.dataset.movieId;
    const movieTvShow = await ApiService.movieTvShowsDetails(movieId, platform);
    renderModal(movieTvShow);
  }
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

async function renderHero(platform) {
  const featuredMovieTvShows = await ApiService.featureMovieTvShows("day", platform);
  if (featuredMovieTvShows) {
    const details = await ApiService.movieTvShowsDetails(featuredMovieTvShows.id, platform);
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${ApiService.imageSecureBaseUrl}w1280${details.backdrop_path})`;
    heroSection.innerHTML = `
      <h1>Featured: ${details.title === undefined ? details.name : details.title}</h1>
      <p>${details.tagline || details.overview}</p>
    `;
  }
}


async function Main(platform) {
  await renderHero(platform);
  allGenres = await ApiService.getGenres(platform);
  allTrendingMoviesTvShows = await ApiService.trendingMoviesTvShows(platform);
  renderMoviesTvShows(allTrendingMoviesTvShows);
  renderGenreFilters(getUniqueGenres(allTrendingMoviesTvShows));
}

export { random, movieTvShowsTemplate, renderMoviesTvShows, getGenreNames, getUniqueGenres, renderGenreFilters, renderModal, allTrendingMoviesTvShows, allGenres, renderHero, Main };
