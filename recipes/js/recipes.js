const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('load', () => {
  console.log(searchInput.style.height);
  searchButton.style.height = searchInput.style.height;
});
console.log(searchButton.style.height);