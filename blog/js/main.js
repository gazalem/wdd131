import { articles } from './blog.js';

// Get parent element and aside element
const main = document.querySelector('#main-content');
const filters = document.querySelector('aside');

// Create a function to create a new article
articles.forEach((book) => {
  // Main container
  const article = document.createElement('article');
  // General Book Info
  const bookInfo = document.createElement('section');
  const date = document.createElement('p');
  date.textContent = book.date;
  const genre = document.createElement('p');
  genre.textContent = book.genre;
  const ages = document.createElement('p');
  ages.textContent = book.ages;
  const stars = document.createElement('p');
  stars.textContent = book.stars;
  // Insert book info into the section
  bookInfo.appendChild(date);
  bookInfo.appendChild(genre);
  bookInfo.appendChild(ages);
  bookInfo.appendChild(stars);

  
  // Create elements for book
  const bookSection = document.createElement('section');
  const h2 = document.createElement('h2');
  const bookCover = document.createElement('img');
  const description = document.createElement('p');
  
  // Set attributes for the book cover
  bookCover.setAttribute('src', book.imgSrc);
  bookCover.setAttribute('alt', book.imgAlt);
  // Set the text content for the h2 element
  h2.textContent = book.title;
  // Insert h2 into the section
  bookSection.appendChild(h2);
  // Insert book cover into the section
  bookSection.appendChild(bookCover);
  // Insert description into the section
  description.textContent = book.description;
  bookSection.appendChild(description);

  // Insert sections into the article
  article.appendChild(bookInfo);
  article.appendChild(bookSection);

  // Insert article into the main element
  main.insertBefore(article, filters);
});