/////////////////
// Global
////////////////

const characterURL = "http://localhost:3000/characters"

//////////////////
// DOM Selectors
/////////////////
const selectionWindow = document.querySelector("#character_selection_window");
const detailImg = document.querySelector(".detail_image");
const characterName = document.querySelector("#name");
const nationality = document.querySelector("#nationality");
const allegiance = document.querySelector("#allegiance");
const age = document.querySelector("#age");
const characterStatus = document.querySelector("#status");
const characterLocation = document.querySelector("#location");
const form = document.querySelector("#character_form");

////////////////////////////
/// Fetch functions
////////////////////////////
function getAllCharacters(url) {
    return fetch(url)
    .then((resp) => resp.json())
}

function addNewCharacter(characterObj) {
    return fetch(characterURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(characterObj)
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

///////////////
// Callbacks
//////////////
function characterDetails(characterObj) {
    detailImg.src = characterObj.image;
    characterName.textContent = characterObj.name;
    nationality.textContent = `Nationality: ${characterObj.nationality}`;
    allegiance.textContent = `Allegiance: ${characterObj.allegiance}`;
    age.textContent = `Age: ${characterObj.age}`;
    characterStatus.textContent = `Dead or Alive: ${characterObj.status}`;
    characterLocation.textContent = `Location: ${characterObj.location}`;
}

function renderInSelectionWindow(characterObj) {
    const img = document.createElement("img");
    img.src = characterObj.image;
    img.style.height = "150px"
    img.addEventListener('click', () => characterDetails(characterObj));
    selectionWindow.append(img);
}

function handleSubmit(event) {
    event.preventDefault();
    let characterObj = {
        name: event.target.form_name.value,
        image: event.target.form_image.value,
        nationality: event.target.form_nationality.value,
        allegiance: event.target.form_allegiance.value,
        age: event.target.form_age.value,
        status: event.target.form_dead_or_alive.value,
        location: event.target.form_location.value,
    }
    addNewCharacter(characterObj);
    form.reset();
}

/////////////////////
// Render Functions
/////////////////////
function displayCharacters(characterArray) {
    characterArray.forEach(renderInSelectionWindow);
}

function initialPageRender () {
    getAllCharacters(characterURL)
    .then((data) => displayCharacters(data));
}

form.addEventListener('submit', handleSubmit);

////////////////////
//Initializer
////////////////////
initialPageRender();

