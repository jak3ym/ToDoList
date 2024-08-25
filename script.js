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

inputBox.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        addButton.click();
    }
})

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI") { // checks if e.target element is an 'li' element
        e.target.classList.toggle("checked"); // toggles the checked class on that element, adds if not present, removes if present
        saveData()
    }
    else if(e.target.tagName === "DELETEBUTTON") {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("ListInfo", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("ListInfo");
}
showList();