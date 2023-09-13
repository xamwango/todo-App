const todoApp = {
  init() {
    this.cacheDomElements();
    this.calculateItemsRemaining();
    this.listenForEvents();
  },
  // Selecting DOM elements
  cacheDomElements() {
    this.todoForm = document.querySelector("#todoForm");
    this.todoFormInput = document.querySelector(".todo-input");
    this.todoItem = document.querySelector(".todo-item-container");
    this.todoList = document.querySelector(".todo-list");
    this.itemsRemaining = document.querySelector("#itemsRemaining");
  },
  // calculate the number of uncompleted tasks in the list
  calculateItemsRemaining() {
    const todoItemlabels = document.querySelectorAll(".todo-item-label");
    let count = 0;

    todoItemlabels.forEach((todoItemlabel) => {
      if (!todoItemlabel.classList.contains("line-through")) {
        count++;
      }
    });

    this.itemsRemaining.textContent = count;
  },
  // Listening for events
  listenForEvents() {
    this.todoForm.addEventListener("submit", this.addTodo.bind(this));
    this.todoList.addEventListener(
      "click",
      this.checkOrDeleteTodo.bind(this)
    );
  },
  // adding new item in the todo list
  addTodo(event) {
    event.preventDefault();

    const newTodoItem = this.todoItem.cloneNode(true);
    const todoItemlabel = newTodoItem.querySelector(".todo-item-label");

    todoItemlabel.textContent = this.todoFormInput.value;
    todoItemlabel.classList.remove("line-through");
    newTodoItem.querySelector(".todo-check").checked = false;

    if (this.todoFormInput.value !== "") {
      this.todoList.append(newTodoItem);
      this.calculateItemsRemaining();
    } else {
      this.todoFormInput.setAttribute(
        "placeholder",
        "Please enter a valid input"
      );
      return;
    }
    this.todoFormInput.setAttribute(
      "placeholder",
      "What do you need to do?"
    );
    this.todoFormInput.value = "";
  },
  checkOrDeleteTodo(event) {
    // deleting item/task from the list
    if (event.target.classList.contains("x-button")) {
      this.deleteTodo(event.target);
    }
    // checking a completed task/item
    if (event.target.classList.contains("todo-check")) {
      this.checkTodo(event.target);
    }
  },
  // a method that deletes items from the list
  deleteTodo(element) {
    const todoItemToDelete = element.closest(".todo-item-container");
    todoItemToDelete.remove();
    this.calculateItemsRemaining();
  },
  // a method that checks completed items in the list
  checkTodo(element) {
    element.nextElementSibling.classList.toggle("line-through");
    this.calculateItemsRemaining();
    // const itemToComplete = event.target.nextElementSibling;
    // itemToComplete.classList.toggle("line-through");
  },
};

//   initialize the todoApp
todoApp.init();