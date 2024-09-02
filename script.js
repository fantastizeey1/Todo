const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector("#todos-container");
const completedCountElement = document.querySelector("#completed-count");

let elem = null;
let todos = [];

function isBefore(el1, el2) {
  for (
    let cur = el1.previousSibling;
    cur && cur.nodeType !== 9;
    cur = cur.previousSibling
  ) {
    if (cur === el2) return true;
  }
  return false;
}

todoInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const todoValue = e.target.value.trim();
    if (todoValue) {
      todos.push({ value: todoValue, checked: false });
      newTodo(todoValue);
      todoInput.value = "";
      updateCount();
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
  const obj = todos[index];

  const uniqueId = `checkbox-${Date.now()}`;
  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.id = uniqueId;
  todoCheckBox.style.cursor = "pointer";
  todoCheckBoxLabel.htmlFor = uniqueId;

  todoCheckBox.checked = obj.checked;
  todoText.style.textDecoration = obj.checked ? "line-through" : "none";
  if (obj.checked) todoCheckBoxLabel.classList.add("active");

  todoCheckBox.addEventListener("change", function () {
    obj.checked = todoCheckBox.checked;
    todoText.style.textDecoration = obj.checked ? "line-through" : "none";
    todoCheckBoxLabel.classList.toggle("active", obj.checked);
    updateCount();
  });

  todoCross.textContent = "✖";
  todoCross.style.cursor = "pointer";
  todoCross.addEventListener("click", function (e) {
    const indexToRemove = todos.findIndex((t) => t.value === value);
    if (indexToRemove > -1) {
      todos.splice(indexToRemove, 1);
      updateCount();
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

  // Drag-and-Drop functionality
  todo.draggable = true;
  todo.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    elem = e.target;
  });

  todo.addEventListener("dragover", (e) => {
    e.preventDefault();
    const el1 = e.target.classList.contains("todo")
      ? e.target
      : e.target.closest(".todo");
    if (el1 && el1 !== elem) {
      if (isBefore(elem, el1)) {
        el1.parentNode.insertBefore(elem, el1);
      } else {
        el1.parentNode.insertBefore(elem, el1.nextSibling);
      }
    }
  });

  todo.addEventListener("dragend", () => {
    elem = null;

    // Update the todos array to reflect the new order
    const updatedTodos = [];
    document.querySelectorAll(".todo").forEach((todoElement) => {
      const text = todoElement.querySelector("p").textContent;
      const isChecked = todoElement.querySelector("input").checked;
      updatedTodos.push({ value: text, checked: isChecked });
    });
    todos = updatedTodos;
    updateCount();
  });

  todosContainer.appendChild(todo);
}

function updateCount() {
  const activeCount = todos.filter((t) => !t.checked).length;
  console.log("Todos:", todos); // Debugging line
  console.log("Active Count:", activeCount); // Debugging line
  completedCountElement.textContent = `${activeCount} items left`;
}

function showAll() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 0);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
  });
}

function filterCompleted() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 2);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = todo.querySelector("input").checked ? "grid" : "none";
  });
}

function filterActive() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    d.classList.toggle("filterActive", i === 1);
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = !todo.querySelector("input").checked ? "grid" : "none";
  });
}

function clearCompleted() {
  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
      todo.remove();
    }
  });
  todos = todos.filter((todo) => !todo.checked);
  updateCount();
}

function changeTheme() {
  document.body.classList.toggle("light");
}
