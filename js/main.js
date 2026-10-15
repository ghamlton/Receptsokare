"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Gabriel Hamilton
 */

// Variabler som används för att hämta element från HTML-filen index.html
const form = document.querySelector("#searchform");
const input = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const recipeSection = document.querySelector("#recipe");
const fetchMessage = document.querySelector("#message");

// Validerar användarens input, alltså om den är tom eller ej
function validateInput(){

    // Tar bort tidigare felmeddelanden
    errorMessage.innerHTML = "";
    fetchMessage.innerHTML = "";

    // Om input är tom, så får du detta meddelande som skrivs in i <p> med id=error
    if(input.value.trim() === ""){
        errorMessage.textContent = "Du måste skriva ett nyckelord";
    }
    else{
        fetchRecipe(input) // Annars så skickar den vidare input till fetchRecipe
    }

}

// Async-funktion som gör ett API-anrop till dummyjson.com för att hämta recept
async function fetchRecipe(input){

    // Anropet är i en try-catch som fångar möjliga errors som då visar ett felmeddelande på hemsidan
    try{
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${input.value}`);
        const data = await response.json();

        let recipe = data.recipes[0];// Hämtar det första receptet 
        
        displayRecipe(recipe); // Skickar vidare det första receptet till displayRecipe()
    }
    catch(error){
        // En TypeError får man när man inte kan hitta ett recept baserat på ens input, då skrivs detta felmeddelande ut
        if(error.name === "TypeError"){
            let message = document.createElement("p");
            message.textContent = `Ett recept med nyckelordet: "${input.value}" finns inte. Vänligen försök igen med ett annat nyckelord.`;
            fetchMessage.appendChild(message);
        }
        else{
            // Detta gäller alla andra errors som kan förekomma, då inkluderas namnet och meddelandet från en error i felmeddelandet
            let message = document.createElement("p");
            message.textContent = `Ett fel har uppstått: "${error.name}" med meddelandet: "${error.message}". Vänligen se konsolen för att underlätta felsökning`;
            fetchMessage.appendChild(message);
        }
    }
    

}

// Skriver ut receptet på sidan 
function displayRecipe(recipe){

    // Rensar föregående recept om det fanns ett innan
    recipeSection.innerHTML = "";

    // Skapar <article> som alla element ligger inom. Dessutom själva namnet på receptet och bilden på rätten.
    let article = document.createElement("article");
    let recipeName = document.createElement("h3");
    let recipeImage = document.createElement("img");

    // Alla element som tillhör div:en recipe-info och div:en själv
    let recipeInfo = document.createElement("div");
    let servings = document.createElement("p");
    let preptime = document.createElement("p");
    let cooktime = document.createElement("p");
    let difficulty = document.createElement("p");

    // Ingredienslistan och rubrik
    let ingrTitle = document.createElement("h4");
    let ingrList = document.createElement("ul");

    // Instruktionslistan och rubrik
    let instrTitle = document.createElement("h4");
    let instrList = document.createElement("ol");

    // Lägger till namnet på receptet och bilden av rätten, med alt-text
    recipeName.textContent = recipe.name;
    recipeImage.src = recipe.image; 
    recipeImage.alt = recipe.name;

    // Lägger till class till div:en. Lägger också till värden av element inom div:en. 
    recipeInfo.classList.add("recipe-info");
    servings.textContent = "Servings: " + recipe.servings;
    preptime.textContent = "Prep time: " + recipe.prepTimeMinutes + " minutes";
    cooktime.textContent = "Coooking time: " + recipe.cookTimeMinutes + " minutes";
    difficulty.textContent = "Difficulty: " + recipe.difficulty;

    // Lägger till alla child-element till recipe-info div:en
    recipeInfo.appendChild(servings);
    recipeInfo.appendChild(preptime);
    recipeInfo.appendChild(cooktime);
    recipeInfo.appendChild(difficulty);

    // Lägger till texten för rubrikerna som är ovan deras respektive listor
    ingrTitle.textContent = "Ingredients";
    instrTitle.textContent = "Instructions";

    // Skriver ut ingredienslistan genom att iterera över "ingredients" med en for-loop
    for(let i = 0; i < recipe.ingredients.length; i++){
        let listitem = document.createElement("li");
        listitem.textContent = recipe.ingredients[i];
        ingrList.appendChild(listitem);
    }

    //Instruktions-listan, samma princip som listan ovan
    for(let i = 0; i < recipe.instructions.length; i++){
        let listitem = document.createElement("li");
        listitem.textContent = recipe.instructions[i];
        instrList.appendChild(listitem);
    }

    // Lägger till varje child-element till <article> som sedan appendas till <section> med id "recipeSection"
    article.appendChild(recipeName);
    article.appendChild(recipeImage);
    article.appendChild(recipeInfo);
    article.appendChild(ingrTitle);
    article.appendChild(ingrList);
    article.appendChild(instrTitle);
    article.appendChild(instrList);

    // Till slut så blir <article> ett child-element till section id = recipe
    recipeSection.appendChild(article);
}

//Eventlistener när man klickar på submit-knappen "Sök"
form.addEventListener("submit", function(event){
    event.preventDefault();
    validateInput();
});

