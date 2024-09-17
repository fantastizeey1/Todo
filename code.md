## Task Manager Dashboard

This project is a Task Manager Dashboard implemented using JavaScript (ES6), HTML, and CSS. Below is an explanation of the modern JavaScript features (ES6) utilized in this project.

### ES6 Features Used

1.  **Variable Declaration (`let` and `const`)**:

    - `let` is used for variables that need to be reassigned (e.g., `todos`), and `const` for constants that won’t change (e.g., `todoInput`).

    ````js
    const todoInput = document.querySelector("#todo-input");
    let todos = []; ```

    ````

2.  **Arrow Functions**:

    - used arrow functions to write concise function expressions, especially in event listeners and helpers.
    - Example:

      ```js
      const isBefore = (el1, el2) => {
        for (
          let cur = el1.previousSibling;
          cur && cur.nodeType !== 9;
          cur = cur.previousSibling
        ) {
          if (cur === el2) return true;
        }
        return false;
      };

      todoInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
          const todoValue = e.target.value.trim();
          if (todoValue) {
            todos.push(new Task(todoValue));
            newTodo(todoValue);
            todoInput.value = "";
            updateCount();
          }
        }
      });
      ```

3.  **Classes**:

    - A `Task` class is used to create and manage tasks. This promotes modularity and clarity.
    - Example:
      ```js
      class Task {
        constructor(value, checked = false) {
          this.value = value;
          this.checked = checked;
        }
      }
      ```

4.  **Template Literals**:

    - Allows embedding expressions into strings for cleaner string concatenation.
    - Example:
      ```js
      completedCountElement.textContent = `${activeCount} items left`;
      ```

5.  **Array Methods (`map`, `filter`, `find`)**:

    - Used for manipulating and filtering tasks.
    - Example:
      ```js
      const activeCount = todos.filter(({ checked }) => !checked).length;
      ```

6.  **Object Destructuring**:

    - Simplifies extracting values from objects.
    - Example:
      ```js
      const { checked } = todos.find((t) => t.value === value);
      ```

7.  **Default Parameters**:
    - Set default values for parameters in functions or constructors.
    - Example:
      ```js
      class Task {
        constructor(value, checked = false) {
          this.value = value;
          this.checked = checked;
        }
      }
      ```

```

```
