// Selecting DOM elements
const todoForm = document.querySelector("#todoForm");
const todoFormInput = document.querySelector(".todo-input");
const todoItem = document.querySelector(".todo-item-container");
const todoList = document.querySelector(".todo-list");
const itemsRemaining = document.querySelector("#itemsRemaining");

calculateItemsRemaining();

// Listening for events
// adding new item in the todo list
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodoItem = todoItem.cloneNode(true);
  const todoItemlabel = newTodoItem.querySelector(".todo-item-label");

  todoItemlabel.textContent = todoFormInput.value;
  todoItemlabel.classList.remove("line-through");
  newTodoItem.querySelector(".todo-check").checked = false;

  if (todoFormInput.value !== "") {
    todoList.append(newTodoItem);
    calculateItemsRemaining();
  } else {
    todoFormInput.setAttribute(
      "placeholder",
      "Please enter a valid input"
    );
    return;
  }
  todoFormInput.setAttribute("placeholder", "What do you need to do?");
  todoFormInput.value = "";
});

todoList.addEventListener("click", () => {
  // deleting items from the list
  if (event.target.classList.contains("x-button")) {
    const todoItemToDelete = event.target.closest(".todo-item-container");
    todoItemToDelete.remove();
    calculateItemsRemaining();
  }
  // check a completed task
  if (event.target.classList.contains("todo-check")) {
    event.target.nextElementSibling.classList.toggle("line-through");
    calculateItemsRemaining();
    // const itemToComplete = event.target.nextElementSibling;
    // itemToComplete.classList.toggle("line-through");
  }
});
// counting the number of uncompleted tasks in the list
function calculateItemsRemaining() {
  const todoItemlabels = document.querySelectorAll(".todo-item-label");
  let count = 0;

  todoItemlabels.forEach((todoItemlabel) => {
    if (!todoItemlabel.classList.contains("line-through")) {
      count++;
    }
  });

  itemsRemaining.textContent = count;
}