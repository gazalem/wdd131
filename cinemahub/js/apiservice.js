// The new base URL for our API requests is the serverless function endpoint
const apiBaseUrl = '/.netlify/functions/tmdb-proxy';
const imageSecureBaseUrl = 'https://image.tmdb.org/t/p/';

// This check is no longer needed as we are proxying requests.
// The proxy will handle API key authentication.
console.log('API service is ready.');

// Function to fetch movies from the API
async function discoverMovies() {
  try {
    // The query parameters are now passed to our proxy function
    const response = await fetch(`${apiBaseUrl}/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function popularMovies() {
  try {
    const response = await fetch(`${apiBaseUrl}/movie/popular?language=en-US&page=1`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function imagesConfiguration() {
  try {
    const response = await fetch(`${apiBaseUrl}/configuration`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log(data.images);
    return data.images;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function displayMovies() {
  const movies = await discoverMovies();
  console.log('movies:', movies);
}

displayMovies();
imagesConfiguration()
  .then(images => {
    console.log('Images configuration:', images);
  })
  .catch(error => {
    console.error('Error fetching images configuration:', error);
  });

