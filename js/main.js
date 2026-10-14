"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Gabriel Hamilton
 */

const form = document.querySelector("#searchform");
const input = document.querySelector("#search");
const errorMessage = document.querySelector("#error");

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
        console.log(data.recipes[0]);
    }
    catch(error){

    }
    

}

form.addEventListener("submit", function(event){
    event.preventDefault();
    validateInput();
});

