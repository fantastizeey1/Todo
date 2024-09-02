// script.js
const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector("#todos-container");
const completedCountElement = document.querySelector("#completed-count"); // Correct element reference

let todos = [];

todoInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const todoValue = e.target.value.trim(); // Trim input to avoid empty strings
    if (todoValue) {
      todos.push({ value: todoValue, checked: false });
      newTodo(todoValue);
      todoInput.value = "";
      updateCount(); // Update count after adding a new todo
    }
  }
});

function newTodo(value) {
  const todo = document.createElement("div");
  const todoText = document.createElement("p");
  const todoCheckBox = document.createElement("input");
  const todoCheckBoxLabel = document.createElement("label");
  const todoCross = document.createElement("span");

  const index = todos.findIndex((t) => t.value === value);
  const obj = todos[index]; // Get the correct todo object

  const uniqueId = `checkbox-${Date.now()}`; // Generate a unique id for the checkbox
  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.id = uniqueId; // Assign the unique id
  todoCheckBox.style.cursor = "pointer";
  todoCheckBoxLabel.htmlFor = uniqueId; // Associate label with the unique id

  // Set initial checkbox state
  todoCheckBox.checked = obj.checked;
  todoText.style.textDecoration = obj.checked ? "line-through" : "none";
  if (obj.checked) todoCheckBoxLabel.classList.add("active");

  todoCheckBox.addEventListener("change", function () {
    obj.checked = todoCheckBox.checked; // Update the todo checked state in the array
    todoText.style.textDecoration = obj.checked ? "line-through" : "none";
    todoCheckBoxLabel.classList.toggle("active", obj.checked);
    updateCount(); // Update count whenever a checkbox state changes
  });

  todoCross.textContent = "✖";
  todoCross.style.cursor = "pointer";
  todoCross.addEventListener("click", function (e) {
    const indexToRemove = todos.findIndex((t) => t.value === value);
    if (indexToRemove > -1) {
      todos.splice(indexToRemove, 1);
      updateCount(); // Update count after removing a todo
    }
    e.target.parentElement.remove();
  });

  todo.classList.add("todo");
  todoCheckBoxLabel.classList.add("circle");
  todoCross.classList.add("cross");

  todo.appendChild(todoCheckBox);
  todo.appendChild(todoCheckBoxLabel);
  todo.appendChild(todoText);
  todo.appendChild(todoCross);

  todosContainer.appendChild(todo);
}

// Function to update the count of active items
function updateCount() {
  const activeCount = todos.filter((t) => !t.checked).length; // Count unchecked todos
  completedCountElement.textContent = `${activeCount} items left`; // Update the display
}

// Function to show all todos
function showAll() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 0);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
  });
}

// Function to filter and show only completed todos
function filterCompleted() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 2);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = todo.querySelector("input").checked ? "grid" : "none";
  });
}

// Function to filter and show only active todos
function filterActive() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 1);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = !todo.querySelector("input").checked ? "grid" : "none";
  });
}

// Function to clear completed todos
function clearCompleted() {
  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
      todo.remove();
    }
  });
  todos = todos.filter((todo) => !todo.checked); // Clear completed todos from array
  updateCount(); // Update count after clearing completed todos
}

function changeTheme() {
  document.body.classList.toggle("light");
}
