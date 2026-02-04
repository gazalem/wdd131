const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTY5MjY1ODZiOWRlMWUxODZmODQxODZjZTA0MGY1NSIsIm5iZiI6MTc1MTYxMDc3MS44MzksInN1YiI6IjY4Njc3NTkzMWM2ZjRkMmQ0MDFiMjQzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCEssoDknfrefb2yv7YCp8wqb19rk1aXcVcnq6n7llk'
  }
};

const apiKey = '&apiKey=de6926586b9de1e186f84186ce040f55';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const imageSecureBaseUrl = 'https://image.tmdb.org/t/p/';

fetch(`${apiBaseUrl}/authentication`, options)
  .then(res => res.json())
  .then(res => console.log(res.success ? 'API is accessible' : 'API is not accessible'))
  .catch(err => console.error(err));


async function getGenres(platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/genre/${platform}/list?language=en-US`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.genres; // Assuming the API returns an array of genres in 'genres'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to fetch movies from the API
async function discoverMoviesTvShows(platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/discover/${platform}?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc${apiKey}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    // console.log(data);
    return data.results; // Assuming the API returns an array of movies in 'results'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function trendingMoviesTvShows(platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/trending/${platform}/day?language=en-US`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    // console.log(data);
    return data.results; // Assuming the API returns an array of movies in 'results'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function imagesConfiguration() {
  try {
    const response = await fetch(`${apiBaseUrl}/configuration`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    // console.log(data.images);
    return data.images; // Assuming the API returns an array of movies in 'results'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function featureMovieTvShows(timeWindows = 'day', platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/trending/${platform}/${timeWindows}?language=en-US`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    // console.log(data.results);
    return data.results[0]; // Assuming the API returns an array of movies in 'results'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function movieTvShowsDetails(movieId, platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/${platform}/${movieId}?language=en-US&append_to_response=credits`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    // console.log(data);
    return data; // Assuming the API returns movie details
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function searchMoviesTvShows(query, platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/search/${platform}?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Sort by popularity descending
    const sortedResults = data.results.sort((a, b) => b.popularity - a.popularity);
    // console.log(sortedResults);
    return sortedResults; // Return the sorted array
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// TV Shows implementation

async function getWatchProviders(id, platform = "movie") {
  try {
    const response = await fetch(`${apiBaseUrl}/${platform}/${id}/watch/providers`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


export { discoverMoviesTvShows, trendingMoviesTvShows, imagesConfiguration, apiBaseUrl, imageSecureBaseUrl, searchMoviesTvShows, getGenres, movieTvShowsDetails, featureMovieTvShows, getWatchProviders };