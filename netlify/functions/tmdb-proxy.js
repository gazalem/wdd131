const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;

  // Extract the actual API path from the request
  // e.g., /.netlify/functions/tmdb-proxy/movie/popular -> /movie/popular
  const apiPath = path.replace('/.netlify/functions/tmdb-proxy', '');

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  // Build the query string for the TMDB API
  const params = new URLSearchParams({
    ...queryStringParameters,
    api_key: TMDB_API_KEY,
  });

  const url = `${API_URL}${apiPath}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from TMDB' }),
    };
  }
};
