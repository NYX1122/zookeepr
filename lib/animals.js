const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // iterate through every item in the personalityTraits array, and perform sorting actions while storing the current item in "trait".
        personalityTraitsArray.forEach(trait => {
            // iterate through every single object in the filteredResults array and perform a function that returns either true or false. If the return is truthy, keep object, if it is falsy, slice object, then set this new array to the old array's value.
            filteredResults = filteredResults.filter(
                // return true as long as the index of the personality trait is any number besides -1, of which indexof will only return if said personality trait does not exist in the personality traits.
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        // filtered results is set equal to the filtered array of filteredResults, which is filtered using a function that returns either true or false based upon if the current item is equal to the query's item, and if it is keep it.
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string") {
        return false;
    }
    if (!animal.species || typeof animal.species !== "string") {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== "string") {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};