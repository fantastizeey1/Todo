const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector("#todos-container");
const todos = [];

todoInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const todoValue = e.target.value;
    todos.push({ value: todoValue, checked: false });
    newTodo(todoValue);
    console.log(todos);
    todoInput.value = "";
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
    if (todoCheckBox.checked) {
      todoText.style.textDecoration = "line-through";
      todoCheckBoxLabel.classList.add("active");
      obj.checked = true;
    } else {
      todoText.style.textDecoration = "none";
      todoCheckBoxLabel.classList.remove("active");
      obj.checked = false;
    }
    console.log(todos);
  });

  todoCross.textContent = "✖";
  todoCross.style.cursor = "pointer";
  todoCross.addEventListener("click", function (e) {
    // Find and remove the todo object from the array
    const indexToRemove = todos.findIndex((t) => t.value === value);
    if (indexToRemove > -1) {
      todos.splice(indexToRemove, 1);
    }
    e.target.parentElement.remove();
    console.log(todos);
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

function changeTheme() {
  document.body.classList.toggle("light");
}
