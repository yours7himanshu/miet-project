const searchBtn = document.querySelector('.searchbtn');
searchBtn.addEventListener('click', () => {
    searchBtn.style.border = "2px solid lightblue"; // Corrected the variable name
});

const searchBox = document.querySelector('.searchbox');
const recipeContainer = document.querySelector('.recipe-container');
const main = document.querySelector('#main');
const heroSection = document.querySelector('.hero-section1');



// Function to get recipes
const fetchRecipes = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    recipeContainer.innerHTML = "<h2>Fetching Recipies.......</h2>"
   recipeContainer.style.color = "#4ade80";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedQuery}`);
    const response = await data.json();


    recipeContainer.style.display = "none";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
      
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>

        `
        const button = document.createElement('button');
        button.classList.add('view-recipe')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);



        heroSection.style.display = "flex";
        heroSection.appendChild(recipeDiv);
        main.style.display = "none";
    });
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
