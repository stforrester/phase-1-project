///////////////////
// Server Endpoints
///////////////////

const characterURL = "http://localhost:3000/characters"
const pageNumberURL = "http://localhost:3000/pageNumber"

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
const toggleFormButton = document.querySelector("#toggleCharacterForm");
const pageNumber = document.querySelector("#pageNumber");
const pageNumberForm = document.querySelector("#pageForm");
const togglePageNumberFormButton = document.querySelector("#togglePageNumberForm");

////////////////////////////
/// Fetch functions
////////////////////////////
function getPageNumber(url) {
    return fetch(url)
    .then((resp) => resp.json())
}

function updatePageNumber(pageObj) {
    fetch(`${pageNumberURL}/1`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pageObj)
    })
    .then((resp) => resp.json())
    .then((data) => displayPageNumber(data));
}

function getAllCharacters(url) {
    return fetch(url)
    .then((resp) => resp.json())
}

function addNewCharacter(characterObj) {
    return fetch(characterURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(characterObj)
    })
    .then((resp) => resp.json())
    .then((data) => renderInSelectionWindow(data));
}

///////////////
// Callbacks
//////////////
function characterDetails(characterObj) {
    detailImg.src = characterObj.image;
    characterName.textContent = characterObj.name;
    nationality.textContent = `State or Country of Origin: ${characterObj.nationality}`;
    allegiance.textContent = `Allegiance: ${characterObj.allegiance}`;
    age.textContent = `Age: ${characterObj.age}`;
    characterStatus.textContent = `Dead or Alive: ${characterObj.status}`;
    characterLocation.textContent = `Location: ${characterObj.location}`;
}

function renderInSelectionWindow(characterObj) {
    const img = document.createElement("img");
    img.src = characterObj.image;
    img.style.height = "150px"
    img.addEventListener('click', (event) => {
        event.stopPropagation();
        characterDetails(characterObj)});
    selectionWindow.appendChild(img);
}

function handlePageSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    let pageObj = {page: event.target.form_PageNumber.value}
    updatePageNumber(pageObj);
    pageNumberForm.reset();
}

function handleSubmit(event) {
    debugger
    event.stopPropagation();
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

function togglePageNumberForm(event) {
    event.stopPropagation();
    const isHidden = pageNumberForm.classList.toggle("collapsed");
    if (isHidden) {
        togglePageNumberFormButton.textContent = "Update Page"
    } else {
        togglePageNumberFormButton.textContent = "Collapse Form"
    }
}

function toggleForm(event) {
    event.stopPropagation();
    const isHidden = form.classList.toggle("collapsed");
    if (isHidden) {
        toggleFormButton.textContent = "Add New Character"
    } else {
        toggleFormButton.textContent = "Collapse Character Form"
    }
}

/////////////////////
// Render Functions
/////////////////////
function displayPageNumber(pageNumberObj) {
    pageNumber.textContent = pageNumberObj.page;
}

function displayCharacters(characterArray) {
    characterArray.forEach(renderInSelectionWindow);
}

function initialPageRender () {
    getPageNumber(pageNumberURL)
    .then((data) => displayPageNumber(data[0]));
    
    getAllCharacters(characterURL)
    .then((data) => displayCharacters(data));
}

//////////////////////////////
// Standalone Event Listeners
//////////////////////////////
form.addEventListener('submit', handleSubmit);

pageNumberForm.addEventListener('submit', handlePageSubmit);

togglePageNumberFormButton.addEventListener('click', togglePageNumberForm)

toggleFormButton.addEventListener('click', toggleForm)

////////////////////
//Initializer
////////////////////
document.addEventListener("DOMContentLoaded", () => {
    initialPageRender();
})
