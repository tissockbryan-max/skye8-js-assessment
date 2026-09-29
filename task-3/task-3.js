/**
 * Skye8 JavaScript Practical Assessment
 * Task 3 - Persistent To-Do Application
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var STORAGE_KEY = "skye8.task3.todos";

var els = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  list: document.getElementById("todo-list"),
  filterAll: document.getElementById("filter-all"),
  filterPending: document.getElementById("filter-pending"),
  filterCompleted: document.getElementById("filter-completed"),
  statTotal: document.getElementById("stat-total"),
  statCompleted: document.getElementById("stat-completed"),
  statPending: document.getElementById("stat-pending"),
  empty: document.getElementById("todo-empty"),
  inputErrorMessage: document.getElementById("todo-input-error"),
};

/** @type {{ id: string, text: string, completed: boolean, createdAt: string }[]} */
var todos = [];

/** @type {"all"|"pending"|"completed"} */
var currentFilter = "all";

// TODO [T3-01]: Load state from localStorage under STORAGE_KEY.
// Parse with JSON.parse inside a try/catch. Corrupt or absent data
// must produce an empty array, never a thrown error.
function loadState() {
  let savedTodo = localStorage.getItem(STORAGE_KEY);
  try {
    JSON.parse(savedTodo);
  } catch {
    if (savedTodo === "") {
      return [];
    }
  }
}

// TODO [T3-02]
function saveState() {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// TODO [T3-03]
function validateTodo(input) {
  els.inputErrorMessage.textContent = "";
  let valid = true;
  if (input === "") {
    els.inputErrorMessage.textContent = "Description is required";
    valid = false;
  } else if (!isNaN(input)) {
    els.inputErrorMessage.textContent = "Description shouldn't be a number";
    valid = false;
  }
  return valid;
}
// Fucntion to generate a unique id for each todo in the todos list.
function todoId() {
  return crypto.randomUUID();
}

// TODO [T3-04]
function addTodo(input) {
  todos.push({
    id: todoId(),
    input,
    completed: false,
    createdAt: Date().toString(),
  });
  renderStats();
  renderTodos();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  todos.forEach((todo) => {
    if (id === todo.id) {
      todo.id = !todo.id;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  renderStats();
  renderTodos();
}

// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  renderStats();
  renderTodos();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  let all = todos.filter((todo) => todo);
  let completed = todos.filter((todo) => todo.completed === true);
  let pending = todos.filter((todo) => todo.completed !== true);
  return { all, completed, pending };
}

// TODO [T3-08]
function renderTodos() {
  els.list.innerHTML = "";
  todos.forEach((todo) => {
    let todoContainer = document.createElement("li");
    let toggleCheckBox = document.createElement("input");
    let todoName = document.createElement("h3");
    let removeBtn = document.createElement("button");

    todoContainer.style.display = "flex";
    todoContainer.style.flexDirection = "row";
    todoContainer.style.marginBottom = "2rem";
    todoContainer.style.justifyContent = "space-between";

    toggleCheckBox.type = "checkbox";
    toggleCheckBox.dataset.id = "checkbox-toggle";
    toggleCheckBox.addEventListener("change", (e) => {
      let checkBoxId = e.target.dataset.id;
      toggleTodo(checkBoxId);
      // localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    });

    todoName.textContent = todo.input;
    removeBtn.textContent = "remove";
    removeBtn.className = "remove-todo-btn";
    removeBtn.dataset.id = todo.id;
    todoContainer.appendChild(toggleCheckBox);
    todoContainer.appendChild(todoName);
    todoContainer.appendChild(removeBtn);

    els.list.appendChild(todoContainer);
  });
}

// TODO [T3-09]
function renderStats() {
  let filter = getFilteredTodos();
  els.statTotal.textContent = filter.all.length;
  els.statCompleted.textContent = filter.completed.length;
  els.statPending.textContent = filter.pending.length;

  if (todos.length !== 0) els.empty.style.display = "none";
  else els.empty.style.display = "flex";
}

function init() {
  // TODO [T3-10]
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoInput = els.input.value.trim();
    const todo = validateTodo(todoInput);
    if (!todo) {
      return;
    } else {
      addTodo(todoInput);
      els.input.value = "";
      loadState();
      saveState();
    }
  });

  els.list.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-todo-btn")) {
      let removeList = e.target.dataset.id;
      removeTodo(removeList);
    }
  });

  let buttons = document.querySelectorAll(".toolbar");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      currentFilter = e.target.getAttribute("data-filter");
      buttons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      renderTodos();
    });
  });
  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
