// home.test.js

// Mock the DOM elements
document.body.innerHTML = `
  <input type="text" id="input-box" placeholder="Add your text">
  <button id="add-button" onclick="addTask()">Add</button>
  <ul id="list-container"></ul>
`;

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Import the functions to be tested
const { addTask, saveData, showList } = require('../public/home');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => store[key] = value.toString(),
    clear: () => store = {},
    removeItem: (key) => delete store[key]
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.location
const originalLocation = window.location;
delete window.location;
window.location = { href: jest.fn() };

describe('To-Do List App', () => {
  beforeEach(() => {
    localStorage.clear();
    listContainer.innerHTML = '';
    inputBox.value = '';
  });

  afterAll(() => {
    window.location = originalLocation;
  }); 

  test('addTask should add a task to the list and navigate to details.html', () => {
    inputBox.value = 'New Task';
    addTask();
    expect(listContainer.children.length).toBe(1);
    expect(listContainer.children[0].textContent).toContain('New Task');
    expect(window.location.href).toBe('details.html');
  });

  test('addTask should alert if input is empty', () => {
    window.alert = jest.fn();
    inputBox.value = '';
    addTask();
    expect(window.alert).toHaveBeenCalledWith('Need to write something!');
  });

  test('saveData should save the list to localStorage', () => {
    inputBox.value = 'New Task';
    addTask();
    saveData();
    expect(localStorage.getItem('ListInfo')).toContain('New Task');
  });

  test('showList should load the list from localStorage', () => {
    localStorage.setItem('ListInfo', '<li>Saved Task</li>');
    showList();
    expect(listContainer.innerHTML).toContain('Saved Task');
  });

  test('Enter key should trigger addTask', () => {
    inputBox.value = 'New Task';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    inputBox.dispatchEvent(event);
    expect(listContainer.children.length).toBe(1);
    expect(listContainer.children[0].textContent).toContain('New Task');
  });

  test('Clicking on a list item should toggle checked class', () => {
    inputBox.value = 'New Task';
    addTask();
    const listItem = listContainer.children[0];
    listItem.click();
    expect(listItem.classList.contains('checked')).toBe(true);
    listItem.click();
    expect(listItem.classList.contains('checked')).toBe(false);
  });

  test('Clicking on delete button should remove the task', () => {
    inputBox.value = 'New Task';
    addTask();
    const deleteButton = document.querySelector("deletebutton");
    deleteButton.click();
    expect(listContainer.children.length).toBe(0);
  });
});