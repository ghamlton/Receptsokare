"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Gabriel Hamilton
 */

const form = document.querySelector("#searchform");
const input = document.querySelector("#search");
const errorMessage = document.querySelector("#error");

function validateInput(){

    if(input.value.trim() === ""){
        errorMessage.textContent = "Du måste skriva ett sökord";
    }

}

form.addEventListener("submit", function(event){
    event.preventDefault();
    validateInput();
});

