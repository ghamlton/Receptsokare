"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Gabriel Hamilton
 */

const form = document.querySelector("#searchform");
const input = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const recipeSection = document.querySelector("#recipe");

function validateInput(){

    errorMessage.innerHTML = "";

    if(input.value.trim() === ""){
        errorMessage.textContent = "Du måste skriva ett sökord";
    }
    else{
        fetchRecipe(input)
    }

}

async function fetchRecipe(input){

    try{
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${input.value}`);
        const data = await response.json();

        console.log(data); // För att visa alla recept för ett visst sökord, enbart i konsolen för test
        let recipe = data.recipes[0];
        
        displayRecipe(recipe);
    }
    catch(error){

    }
    

}

function displayRecipe(recipe){

    recipeSection.innerHTML = "";

    let article = document.createElement("article");
    let recipeName = document.createElement("h3");
    let recipeImage = document.createElement("img");

    let recipeInfo = document.createElement("div");
    let servings = document.createElement("p");
    let preptime = document.createElement("p");



    recipeName.textContent = recipe.name;
    recipeImage.src = recipe.image; // Tänk på vilken alt-text bilden ska ha, kanske själva recept-titeln? Kan ta det senare

    recipeInfo.classList.add("recipe-info");
    servings.textContent = "Servings: " + recipe.servings;
    preptime.textContent = "Prep time: " + recipe.prepTimeMinutes + " minutes";

    recipeInfo.appendChild(servings);
    recipeInfo.appendChild(preptime);

    article.appendChild(recipeName);
    article.appendChild(recipeImage);
    article.appendChild(recipeInfo);

    recipeSection.appendChild(article);


    
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    validateInput();
});

