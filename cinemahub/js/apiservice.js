const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTY5MjY1ODZiOWRlMWUxODZmODQxODZjZTA0MGY1NSIsIm5iZiI6MTc1MTYxMDc3MS44MzksInN1YiI6IjY4Njc3NTkzMWM2ZjRkMmQ0MDFiMjQzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCEssoDknfrefb2yv7YCp8wqb19rk1aXcVcnq6n7llk'
  }
};

const apiBaseUrl = 'https://api.themoviedb.org/3';
const imageSecureBaseUrl = 'https://image.tmdb.org/t/p/';

fetch(`${apiBaseUrl}/authentication`, options)
  .then(res => res.json())
  .then(res => console.log(res.success ? 'API is accessible' : 'API is not accessible'))
  .catch(err => console.error(err));

// Function to fetch movies from the API
async function discoverMovies() {
  try {
    const response = await fetch(`${apiBaseUrl}/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc`, options);
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

async function trendingMovies() {
  try {
    const response = await fetch(`${apiBaseUrl}/movie/popular?language=en-US&page=1`, options);
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
    console.log(data.images);
    return data.images; // Assuming the API returns an array of movies in 'results'
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function displayMovies() {
  const movies = await discoverMovies();
  console.log('movies:', movies);
}

async function movieDetails(movieId) {
  try {
    const response = await fetch(`${apiBaseUrl}/movie/${movieId}?language=en-US`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    // Process the data as needed
    console.log(data);
    return data; // Assuming the API returns movie details
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


// this will be removed later
displayMovies();
imagesConfiguration()
  .then(images => {
    console.log('Images configuration:', images);
  })
  .catch(error => {
    console.error('Error fetching images configuration:', error);
  });


  export { discoverMovies, trendingMovies, imagesConfiguration, apiBaseUrl, imageSecureBaseUrl };