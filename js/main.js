"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Gabriel Hamilton
 */

const form = document.querySelector("#searchform");
const input = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const recipeSection = document.querySelector("#recipe");
const fetchMessage = document.querySelector("#message");

function validateInput(){

    errorMessage.innerHTML = "";
    fetchMessage.innerHTML = "";

    if(input.value.trim() === ""){
        errorMessage.textContent = "Du måste skriva ett nyckelord";
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
        let recipe = data.recipes[0];// Hämtar det första receptet 
        
        displayRecipe(recipe);
    }
    catch(error){
        if(error.name === "TypeError"){
            let message = document.createElement("p");
            message.textContent = `Ett recept med nyckelordet: "${input.value}" finns inte. Vänligen försök igen med ett annat nyckelord.`;
            fetchMessage.appendChild(message);
        }
        else{
            let message = document.createElement("p");
            message.textContent = `Ett fel har uppstått: "${error.name}" med meddelandet: "${error.message}". Vänligen se konsolen för att underlätta felsökning`;
            fetchMessage.appendChild(message);
        }
    }
    

}

function displayRecipe(recipe){

    // Rensar föregående recept om det fanns ett innan
    recipeSection.innerHTML = "";

    // Alla dessa variabler skapar de olika elementen som krävs för att visa receptet på hemsidan
    let article = document.createElement("article");
    let recipeName = document.createElement("h3");
    let recipeImage = document.createElement("img");

    
    let recipeInfo = document.createElement("div");
    let servings = document.createElement("p");
    let preptime = document.createElement("p");
    let cooktime = document.createElement("p");
    let difficulty = document.createElement("p");

    let ingrTitle = document.createElement("h4");
    let ingrList = document.createElement("ul");

    let instrTitle = document.createElement("h4");
    let instrList = document.createElement("ol");

    recipeName.textContent = recipe.name;
    recipeImage.src = recipe.image; // Tänk på vilken alt-text bilden ska ha, kanske själva recept-titeln? Kan ta det senare

    recipeInfo.classList.add("recipe-info");
    servings.textContent = "Servings: " + recipe.servings;
    preptime.textContent = "Prep time: " + recipe.prepTimeMinutes + " minutes";
    cooktime.textContent = "Coooking time: " + recipe.cookTimeMinutes + " minutes";
    difficulty.textContent = "Difficulty: " + recipe.difficulty;

    recipeInfo.appendChild(servings);
    recipeInfo.appendChild(preptime);
    recipeInfo.appendChild(cooktime);
    recipeInfo.appendChild(difficulty);

    ingrTitle.textContent = "Ingredients";
    instrTitle.textContent = "Instructions";

    // Skriver ut ingredienslistan genom att iterera över "ingredients" med en for-loop
    for(let i = 0; i < recipe.ingredients.length; i++){
        let listitem = document.createElement("li");
        listitem.textContent = recipe.ingredients[i];
        ingrList.appendChild(listitem);
    }

    //Instruktions-listan
    for(let i = 0; i < recipe.instructions.length; i++){
        let listitem = document.createElement("li");
        listitem.textContent = recipe.instructions[i];
        instrList.appendChild(listitem);
    }

    // Appendar varje child-element till <article> som sedan appendas till <section> med id "recipeSection"
    article.appendChild(recipeName);
    article.appendChild(recipeImage);
    article.appendChild(recipeInfo);
    article.appendChild(ingrTitle);
    article.appendChild(ingrList);
    article.appendChild(instrTitle);
    article.appendChild(instrList);

    recipeSection.appendChild(article);
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    validateInput();
});

