const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('resize', () => {
  searchButton.style.height = searchInput.style.height;
});