//  API url
const url = "https://randomuser.me/api";

//  "div" with a "gallery" id
const gallery = document.querySelector("#gallery");

//  "body" tag
const body = document.querySelector("body");

async function init() { 
    //  Array to hold employees' data
    const employeeArray = [];
    
    //  Make 12 API requests and populate the array with the returned data
    //  This way we get 12 employees
    for(var i = 0; i < 12; i++) {
        employee = await getData();
        
        employeeArray.push(employee);
    }

    //  Display all employees
    displayEmployees(employeeArray);

    //  Get a DOM collection of all "div" elemets with class "card" and convert them to a JS array
    const cards = Array.from(document.querySelectorAll(".card"));

    //  Add click eventListener to each "div" with class "card" element and call displayEmployeeCard() function
    cards.map(card => {
        card.addEventListener("click", () => { 
            console.log("Employee Card ID: " + card.id); 
            displayEmployeeCard(employeeArray, card.id);
        });
    });
}

function getData() {
    //  Fetch the API, parse the response to .json, and catch any errors
    return fetch(url)
        //  Convert the data into JavaScript
        .then((response) => response.json())
        //  Log out any errors
        .catch((error) => console.error(error));
}

function displayEmployees(employeeArray) {
    for(var employee = 0; employee < employeeArray.length; employee++) {
        //  Add data to the markup
        const markup = 
            `<div class="card" id="${employee}">            
                <div class="card-img-container">
                    <img class="card-img" src="${employeeArray[employee].results[0].picture["large"]}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employeeArray[employee].results[0].name["first"] + " " + employeeArray[employee].results[0].name["last"]}</h3>
                    <p class="card-text">${employeeArray[employee].results[0].email}</p>
                    <p class="card-text cap">${employeeArray[employee].results[0].location["city"] + ", " + employeeArray[employee].results[0].location["country"]}</p>
                </div>
            </div>`;

        //  Insert makup with data before the closing "</div>" tag with an id of "gallery"
        gallery.insertAdjacentHTML("beforeend", markup);
    }
}

function displayEmployeeCard(employeeArray, employeeID) {
    //  Get the markup from the getEmployeeData() function
    const markup = getEmployeeData(employeeArray, employeeID);

    //  Insert the makup with the data before the closing "</body>" tag
    body.insertAdjacentHTML("beforeend", markup);

    const nextButton = document.querySelector("#modal-next");
    const prevButton = document.querySelector("#modal-prev");

    //  Add event listener to the button so it calls displayNextEmployeeCard() function
    nextButton.addEventListener("click", () => {
        displayNextEmployeeCard(employeeArray, employeeID);
    });

    //  Add event listener to the button so it calls displayPrevEmployeeCard() function
    prevButton.addEventListener("click", () => {
        displayPrevEmployeeCard(employeeArray, employeeID)
    });

    //  When the employee card is shown, we might want to close it
    //  To do so, we need to target the "button" element with a "#modal-close-btn" id
    const closeButton = document.querySelector("#modal-close-btn");

    //  Add event lisetner to the "button"
    //  When the button is clicked, an employee card ("div" with class "modal-container") is removed
    closeButton.addEventListener("click", () => {
        const modalContainer = document.querySelector(".modal-container");

        modalContainer.remove();
    });
}

function displayNextEmployeeCard(employeeArray, employeeID) {
    const modalContainer = document.querySelector(".modal-container");

    //  Remove an old employee card
    modalContainer.remove();

    //  Increase the id as we need to get the next employee
    employeeID = parseInt(employeeID) + 1;

    //  If the id is more than the length of an employeeArray => we have wrapped around (there are no more employee entries in the employeeArray)
    //  So make id = 0 and call displayEmployeeCard() function
    if(parseInt(employeeID) > employeeArray.length - 1) {
        employeeID = 0;

        console.log("Next button is clicked. Employee Card ID: " + employeeID);

        displayEmployeeCard(employeeArray, employeeID);
    } else {
        console.log("Next button is clicked. Employee Card ID: " + employeeID);

        displayEmployeeCard(employeeArray, employeeID);
    }
}

function displayPrevEmployeeCard(employeeArray, employeeID) { 
    const modalContainer = document.querySelector(".modal-container");

    //  Remove an old employee card
    modalContainer.remove();

    employeeID = parseInt(employeeID) - 1;

    //  If the id is less than 0 => there are no more employee entries in the employeeArray
    //  So make id = 11 (the last employee) and call displayEmployeeCard() function
    if(parseInt(employeeID) < 0) {
        employeeID = 11;

        console.log("Next button is clicked. Employee Card ID: " + employeeID);

        displayEmployeeCard(employeeArray, employeeID);
    } else {
        console.log("Next button is clicked. Employee Card ID: " + employeeID);

        displayEmployeeCard(employeeArray, employeeID);
    }
}

function getEmployeeData(employeeArray, employeeID) {
    //  Get the needed data and store it
    const picture = employeeArray[employeeID].results[0].picture["large"];
    const fullName = employeeArray[employeeID].results[0].name["first"] + " " + employeeArray[employeeID].results[0].name["last"];
    const email = employeeArray[employeeID].results[0].email;
    const city = employeeArray[employeeID].results[0].location["city"];
    const cellPhoneNumber = employeeArray[employeeID].results[0].cell;
    const location = employeeArray[employeeID].results[0].location.street["number"] + " " + employeeArray[employeeID].results[0].location.street["name"] + "., " +
        employeeArray[employeeID].results[0].location.country + ", " + employeeArray[employeeID].results[0].location.state + " " + employeeArray[employeeID].results[0].location.postcode;

    const date = new Date(employeeArray[employeeID].results[0].dob["date"]);
    const fmtDate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDay() + 1).padStart(2, '0');

    //  Add the stored data to the markup
    const markup = 
        `<div class="modal-container">      
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${fullName}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${cellPhoneNumber}</p>
                    <p class="modal-text">${location}</p>
                    <p class="modal-text">Birthday: ${fmtDate}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;

    return markup;
}

init();