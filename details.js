const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");

function addTask() {
    if(inputBox.value === '') {
        alert("Need to write something!");
    }
    else{
        let li = document.createElement("li"); // creates document called li
        li.innerHTML = inputBox.value; // innerHTML is the text inside li
        listContainer.appendChild(li); // li will be displayed in listContainer
        let deleteButton = document.createElement("deleteButton");
        deleteButton.innerHTML = "\u00d7"; // cross item
        li.appendChild(deleteButton);
    }
    inputBox.value = ""; // clears input box after clicking add
    saveData();
}

function saveDetails() {
    window.location.href = "home.html"
}

function returnToHome() {
    const listContainer = document.getElementById('listContainer');
    if (listContainer) {
        const lastListItem = listContainer.querySelector('li:last-child');
        if (lastListItem) {
            lastListItem.remove();
        }
    }
    saveData();
    window.location.href = "home.html"
}

inputBox.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        addButton.click();
    }
})

// listContainer.addEventListener("click", function(e){
//     if(e.target.tagName === "LI") { // checks if e.target element is an 'li' element
//         e.target.classList.toggle("checked"); // toggles the checked class on that element, adds if not present, removes if present
//         saveData()
//     }
//     else if(e.target.tagName === "DELETEBUTTON") {
//         e.target.parentElement.remove();
//         saveData()
//     }
// }, false);

document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input-box');
    inputBox.value = showCurrentTask();
});

function showCurrentTask() {
    task = localStorage.getItem("ListInfo");
    //console.log("Retrieved task:", task);
    if (task) {
        // Create a temporary container to parse the HTML string
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = task;
        
        // Get all list items
        const listItems = tempContainer.getElementsByTagName('li');
        
        // Return the innerHTML of the last list item
        if (listItems.length > 0) {
            const lastItemText = listItems[listItems.length - 1].textContent;
            const cleanedText = lastItemText.replace('×', '').trim();
            console.log(cleanedText);
            return cleanedText;
        }
    }
    return null;
}

function saveData() {
    localStorage.setItem("ListInfo", listContainer.innerHTML);
}

// function showList() {
//     listContainer.innerHTML = localStorage.getItem("ListInfo");
// }
// showList();