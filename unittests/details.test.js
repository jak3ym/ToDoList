const { addTask, saveDetails, returnToHome, showCurrentTask, saveData } = require('../public/details');

// Import the functions to be tested

// Mock the necessary elements
const inputBox = document.createElement("input");
const listContainer = document.createElement("ul");
const addButton = document.createElement("button");

// Test the addTask function
test('addTask should add a new task to the list container', () => {
  // Set up the initial state
  inputBox.value = "New Task";

  // Call the function
  addTask();

  // Check the result
  expect(listContainer.innerHTML).toContain("<li>New Task</li>");
});

// Test the saveDetails function
test('saveDetails should save the details to local storage', () => {
  // Set up the initial state
  const details = "Some details";

  // Call the function
  saveDetails(details);

  // Check the result
  expect(localStorage.getItem("Details")).toBe(details);
});

// Test the returnToHome function
test('returnToHome should navigate back to the home page', () => {
  // Call the function
  returnToHome();

  // Check the result
  expect(window.location.href).toBe("home.html");
});

// Test the showCurrentTask function
test('showCurrentTask should display the current task on the page', () => {
  // Set up the initial state
  const currentTask = "Current Task";

  // Call the function
  showCurrentTask(currentTask);

  // Check the result
  expect(document.getElementById("current-task").innerHTML).toBe(currentTask);
});

// Test the saveData function
test('saveData should save the list data to local storage', () => {
  // Set up the initial state
  listContainer.innerHTML = "<li>Task 1</li><li>Task 2</li>";

  // Call the function
  saveData();

  // Check the result
  expect(localStorage.getItem("ListInfo")).toBe("<li>Task 1</li><li>Task 2</li>");
});