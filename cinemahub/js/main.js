import * as ApiService from './apiservice.js';
import { movieGenre } from './moviegenre.js';
import { popularMovies } from './popularmovies.js';

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


function getGenreNames(genreIds) {
  if (!genreIds || genreIds.length === 0) {
    return 'N/A';
  }
  return genreIds.map(id => {
    const genre = movieGenre.genres.find(g => g.id === id);
    return genre ? genre.name : '';
  }).filter(name => name).join(', ');
}

function movieTemplate(movie) {
  return `
    <div class="movie-card">
      <img src="${ApiService.imageSecureBaseUrl}${posterSize}${movie.poster_path}" alt="${movie.title} Poster">
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date ? movie.release_date : 'N/A'}</p>
      <p>Language: ${movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}</p>
      <p>Genre(s): ${getGenreNames(movie.genre_ids)}</p>
      <p>⭐ ${movie.vote_average}</p>
    </div>`
};


function renderMovies(movies) {
  const movieContainer = document.querySelector('.movie-grid');
  movieContainer.innerHTML = ''; // Clear existing content
  movies.forEach(movie => {
    const movieHtml = movieTemplate(movie);
    movieContainer.innerHTML += movieHtml;
  });
}


async function Main() {
  const popularMovies = await ApiService.trendingMovies();
  renderMovies(popularMovies);
}

Main();
