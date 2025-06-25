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


function recipeTemplate(recipe) {
    return `
        <article class="recipe-card">
          <img src="./img/apple-crisp.jpg" alt="Apple Crisp Dish">
          <div class="recipe-body">
            <div class="tag">
              <span class="tag-label">Dessert</span>
              <span class="tag-label">Vegan</span>
            </div>
            <h2>Apple Crisp</h2>
            <span class="rating" role="img" aria-label="Rating: 4 out of 5 stars">
              <span aria-hidden="true" class="icon-star">⭐</span>
              <span aria-hidden="true" class="icon-star">⭐</span>
              <span aria-hidden="true" class="icon-star">⭐</span>
              <span aria-hidden="true" class="icon-star-empty">⭐</span>
              <span aria-hidden="true" class="icon-star-empty">☆</span>
            </span>
            <p>This apple crisp recipe is a simple yet delicious fall dessert that showcases apples at their best! The combination of warm, tender apples and the crunchy oat topping is delicious with vanilla ice cream.</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </article>
    `;
}

function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML

	return html;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`
// our ratings are always out of 5, so create a for loop from 1 to 5

		// check to see if the current index of the loop is less than our rating
		// if so then output a filled star

		// else output an empty star

	// after the loop, add the closing tag to our string
	html += `</span>`
	// return the html string
	return html
}