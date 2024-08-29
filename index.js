document.addEventListener("DOMContentLoaded", function () {
  const newTodoInput = document.getElementById("new-todo-input");
  const todoList = document.getElementById("todo-list");
  const itemsLeft = document.getElementById("items-left");
  const allFilter = document.getElementById("all-filter");
  const activeFilter = document.getElementById("active-filter");
  const completedFilter = document.getElementById("completed-filter");
  const clearCompleted = document.getElementById("clear-completed");
  const themeToggle = document.getElementById("theme-toggle");

  let todos = [];

  function updateItemsLeft() {
    const count = todos.filter((todo) => !todo.completed).length;
    itemsLeft.textContent = `${count} items left`;
  }

  function addTodo(todoText) {
    const todo = {
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    renderTodos();
  }

  function renderTodos(filter = "all") {
    todoList.innerHTML = "";
    let filteredTodos = todos;

    if (filter === "active") {
      filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      filteredTodos = todos.filter((todo) => todo.completed);
    }

    filteredTodos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.innerHTML = `
          <span>${todo.text}</span>
          <div>
            <input type="checkbox" ${
              todo.completed ? "checked" : ""
            } onclick="toggleComplete(${index})">
            <button onclick="deleteTodo(${index})">X</button>
          </div>
        `;
      todoList.appendChild(li);
    });

    updateItemsLeft();
  }

  function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  function clearCompletedTodos() {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
  }

  newTodoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && newTodoInput.value.trim() !== "") {
      addTodo(newTodoInput.value.trim());
      newTodoInput.value = "";
    }
  });

  allFilter.addEventListener("click", () => renderTodos("all"));
  activeFilter.addEventListener("click", () => renderTodos("active"));
  completedFilter.addEventListener("click", () => renderTodos("completed"));
  clearCompleted.addEventListener("click", clearCompletedTodos);
  themeToggle.addEventListener("click", toggleTheme);

  renderTodos();
});
