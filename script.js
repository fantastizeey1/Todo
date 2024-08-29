const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector("#todos-container"); // Make sure to define todosContainer
const todos = [];

todoInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    todos.push(e.target.value);
    newTodo(e.target.value);
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

  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "checkbox";
  todoCheckBoxLabel.htmlFor = "checkbox";

  todoCheckBox.addEventListener("change", function () {
    if (todoCheckBox.checked) {
      todoText.style.textDecoration = "line-through";
      todoCheckBoxLabel.classList.add("active");
    } else {
      todoText.style.textDecoration = "none";
      todoCheckBoxLabel.classList.remove("active");
    }
  });

  todoCross.textContent = "✖"; // If you want to use an image, create an img element
  todoCross.addEventListener("click", function (e) {
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

function changeTheme() {
  document.body.classList.toggle("light");
}

// document.addEventListener("DOMContentLoaded", function () {
//   const newTodoInput = document.getElementById("new-todo-input");
//   const todoList = document.getElementById("todo-list");
//   const itemsLeft = document.getElementById("items-left");
//   const allFilter = document.getElementById("all-filter");
//   const activeFilter = document.getElementById("active-filter");
//   const completedFilter = document.getElementById("completed-filter");
//   const clearCompleted = document.getElementById("clear-completed");
//   const themeToggle = document.getElementById("theme-toggle");
//   const themeToggleImg = themeToggle.querySelector("img");

//   let todos = [];

//   function updateItemsLeft() {
//     const count = todos.filter((todo) => !todo.completed).length;
//     itemsLeft.textContent = `${count} items left`;
//   }

//   function addTodo(todoText) {
//     const todo = {
//       text: todoText,
//       completed: false,
//     };
//     todos.push(todo);
//     renderTodos();
//   }

//   function renderTodos(filter = "all") {
//     todoList.innerHTML = "";
//     let filteredTodos = todos;

//     if (filter === "active") {
//       filteredTodos = todos.filter((todo) => !todo.completed);
//     } else if (filter === "completed") {
//       filteredTodos = todos.filter((todo) => todo.completed);
//     }

//     filteredTodos.forEach((todo, index) => {
//       const li = document.createElement("li");
//       li.className = todo.completed ? "completed" : "";
//       li.innerHTML = `
//           <span>${todo.text}</span>
//           <div>
//             <input type="checkbox" ${
//               todo.completed ? "checked" : ""
//             } onclick="toggleComplete(${index})">
//             <button onclick="deleteTodo(${index})">X</button>
//           </div>
//         `;
//       todoList.appendChild(li);
//     });

//     updateItemsLeft();
//   }

//   function toggleComplete(index) {
//     todos[index].completed = !todos[index].completed;
//     renderTodos();
//   }

//   function deleteTodo(index) {
//     todos.splice(index, 1);
//     renderTodos();
//   }

//   function clearCompletedTodos() {
//     todos = todos.filter((todo) => !todo.completed);
//     renderTodos();
//   }

//   function toggleTheme() {
//     document.body.classList.toggle("dark-mode");

//     // Toggle the image source
//     const currentSrc = themeToggleImg.src;
//     const altSrc = themeToggleImg.getAttribute("data-alt-src");
//     themeToggleImg.src = altSrc;
//     themeToggleImg.setAttribute("data-alt-src", currentSrc);
//   }

//   newTodoInput.addEventListener("keypress", function (e) {
//     if (e.key === "Enter" && newTodoInput.value.trim() !== "") {
//       addTodo(newTodoInput.value.trim());
//       newTodoInput.value = "";
//     }
//   });

//   allFilter.addEventListener("click", () => renderTodos("all"));
//   activeFilter.addEventListener("click", () => renderTodos("active"));
//   completedFilter.addEventListener("click", () => renderTodos("completed"));
//   clearCompleted.addEventListener("click", clearCompletedTodos);
//   themeToggle.addEventListener("click", toggleTheme);

//   renderTodos();
// });

// function handleDragStart(event, index) {
//   event.dataTransfer.setData("text/plain", index);
// }

// function handleDragOver(event) {
//   event.preventDefault();
// }

// function handleDrop(event, dropIndex) {
//   event.preventDefault();
//   const dragIndex = event.dataTransfer.getData("text/plain");
//   const draggedTodo = todos.splice(dragIndex, 1)[0];
//   todos.splice(dropIndex, 0, draggedTodo);
//   renderTodos();
// }

// function renderTodos(filter = "all") {
//   todoList.innerHTML = "";
//   let filteredTodos = todos;

//   if (filter === "active") {
//     filteredTodos = todos.filter((todo) => !todo.completed);
//   } else if (filter === "completed") {
//     filteredTodos = todos.filter((todo) => todo.completed);
//   }

//   filteredTodos.forEach((todo, index) => {
//     const li = document.createElement("li");
//     li.className = todo.completed ? "completed" : "";
//     li.draggable = true;
//     li.addEventListener("dragstart", (event) => handleDragStart(event, index));
//     li.addEventListener("dragover", handleDragOver);
//     li.addEventListener("drop", (event) => handleDrop(event, index));
//     li.innerHTML = `
//         <span>${todo.text}</span>
//         <div>
//           <input type="checkbox" ${
//             todo.completed ? "checked" : ""
//           } onclick="toggleComplete(${index})">
//           <button onclick="deleteTodo(${index})">X</button>
//         </div>
//       `;
//     todoList.appendChild(li);
//   });

//   updateItemsLeft();
// }
