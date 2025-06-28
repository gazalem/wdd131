import { recipes } from './recipes.js';

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

/*
 * Function to get a random recipe from the provided array.
 * @param {Array} myRecipes - An array of recipe objects.
 * @returns {Object} A random recipe object from the array, or a message if the array is empty.
 * @throws {Error} If myRecipes is not an array.
 * @example
 * const myRecipes = [
 *     { name: "Pasta", ingredients: ["flour", "water"], instructions: "Mix and cook." },
 *     { name: "Salad", ingredients: ["lettuce", "tomato"], instructions: "Chop and mix." }
 * ];
 * const randomRecipe = getRandomRecipe(myRecipes);
 * console.log(randomRecipe);
 * // Output: A random recipe object from myRecipes or "No recipe available." if empty
 */
function getRandomRecipe(myRecipes) {
    if (myRecipes.length === 0) {
        return "No recipe available.";
    }
    const randomIndex = random(0, myRecipes.length - 1);
    return myRecipes[randomIndex];
}

/*
 * Function to generate HTML for a recipe card.
 * @param {Object} recipe - An object representing a recipe.
 * @returns {string} A string of HTML representing the recipe card.
 * @example
 * const recipe = {
 *     name: "Chocolate Cake",
 *     image: "chocolate-cake.jpg",
 *     tags: ["Dessert", "Chocolate"],
 *     rating: 4,
 *     description: "A delicious chocolate cake recipe.",
 *     time: 45,
 *     servings: 8,
 *     recipeIngredient: ["2 cups flour", "1 cup sugar", "1/2 cup cocoa powder"]
 * };
 * const recipeHtml = recipeTemplate(recipe);
 * console.log(recipeHtml);
 * // Output: HTML string for the recipe card
 */
function recipeTemplate(recipe) {
    return `
        <article class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.name} Dish">
          <div class="recipe-body">
            <div class="tag">
              ${tagsTemplate(recipe.tags)}
            </div>
            <h2>${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p class="description">${recipe.description}</p>
            <p class="time"><strong>Cooking Time:</strong> ${recipe.cookTime}.</p>
            <p class="time"><strong>Preparation Time:</strong> ${recipe.prepTime}.</p>
            <p class="servings"><strong>Serves:</strong> ${recipe.recipeYield}.</p>
            <p class="ingredients"></p>
            <strong>Ingredients:</strong>
            <ul>
              ${recipe.recipeIngredient.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <p class="instructions"><strong>Instructions:</strong> ${recipe.recipeInstructions}</p>
          </div>
        </article>
    `;
}

/*
 * Function to generate HTML for tags.
 * @param {Array} tags - An array of tag strings.
 * @returns {string} A string of HTML elements representing the tags.
 * @example
 * const tags = ["Vegan", "Gluten-Free", "Dessert"];
 * const tagsHtml = tagsTemplate(tags);
 * console.log(tagsHtml);
 * // Output: <span class="tag-label">Vegan</span><span class="tag-label">Gluten-Free</span><span class="tag-label">Dessert</span>
 */
function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML
  let tagsHtml = '';
  for (const tag of tags) {
    tagsHtml += `<span class="tag-label">${tag}</span>`;
  }
  return tagsHtml;
}


/* * Function to generate HTML for a rating.
 * @param {number} rating - A number representing the rating (1 to 5).
 * @returns {string} A string of HTML representing the rating stars.
 * @example
 * const ratingHtml = ratingTemplate(4);
 * console.log(ratingHtml);
 * // Output: <span class="rating" role="img" aria-label="Rating: 4 out of 5 stars">⭐ ⭐ ⭐ ⭐ ☆</span>
 */
function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
    class="rating"
    role="img"
    aria-label="Rating: ${rating} out of 5 stars"
  >`
  // our ratings are always out of 5, so create a for loop from 1 to 5
	for (let i = 1; i <= 5; i++) {
		// check to see if the current index of the loop is less than our rating
		// if so then output a filled star
		if (i <= rating) {
			html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
		}
    // else output an empty star
    else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
		}
	}

	// after the loop, add the closing tag to our string
	html += `</span>`
	// return the html string
	return html
}

/*
 * Function to render a list of recipes into the HTML document.
 * @param {Array} recipeList - An array of recipe objects to be rendered.
 * @example
 * const recipes = [
 *     { name: "Pasta", image: "pasta.jpg", tags: ["Italian"], rating: 5, description: "Delicious pasta recipe.", time: 30, servings: 4, recipeIngredient: ["pasta", "sauce"] },
 *     { name: "Salad", image: "salad.jpg", tags: ["Healthy"], rating: 4, description: "Fresh salad recipe.", time: 15, servings: 2, recipeIngredient: ["lettuce", "tomato"] }
 * ];
 * renderRecipes(recipes);
 */
function renderRecipes(recipeList) {
    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // Clear existing content

    recipeList.forEach(recipe => {
        const recipeHtml = recipeTemplate(recipe);
        container.innerHTML += recipeHtml;
    });
}

/*
 * Function to filter recipes based on a search query.
 * @param {string} query - The search query to filter recipes by name, tags, ingredients, or description.
 * @example
 * filterRecipes("Dessert");
 * // Output: Renders recipes that include "Dessert" in their name, tags, ingredients, or description
 */
function filterRecipes(query) {
  const searchTerm = query.toLowerCase();
  
  // Filter recipes based on the query
  const filteredRecipes = recipes.filter(recipe => {
      // Search in recipe name
      if (recipe.name.toLowerCase().includes(searchTerm)) {
          return true;
      }
      
      // Search in tags
      if (recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
          return true;
      }
      
      // Search in ingredients
      if (recipe.recipeIngredient.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm))) {
          return true;
      }
      
      // Search in description
      if (recipe.description.toLowerCase().includes(searchTerm)) {
          return true;
      }
      
      return false;
  });

  // Render the filtered recipes
  renderRecipes(filteredRecipes);
}


const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function searchHandler(event) {
  // prevent the default form submission behavior
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
      filterRecipes(query);
  }
}

// Add event listener to the search button
searchButton.addEventListener("click", searchHandler);


/*
 * Function to initialize the application by fetching a random recipe and rendering it.
 * @example
 * init();
 * // Output: Renders a random recipe card to the HTML document
 */
function init() {
    // Get a random recipe from the recipes array
    const randomRecipe = getRandomRecipe(recipes);
    
    // If a recipe is returned, render it; otherwise, log a message
    if (typeof randomRecipe === 'object') {
        renderRecipes([randomRecipe]);
    } else {
        console.log(randomRecipe); // Log the message if no recipe is available
    }
}

// Initialize the application
init();