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
  console.log(savedTodo);
}

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
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

function todoId() {
  return crypto.randomUUID();
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(input) {
  todos.push({
    id: todoId(),
    input,
    // completed
    createdAt: Date().toString(),
  });
  renderStats();
  renderTodos();
}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  renderStats();
  renderTodos();
}

// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderStats();
  renderTodos();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  let all = todos.filter((todo) => todo);
  let completed = todos.filter((todo) => todo.completed === true);
  let pending = todos.filter((todo) => todo.completed !== false);
  return {
    filterAll: all,
    filterCompleted: completed,
    filterPending: pending,
  };
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {}

// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  let filter = getFilteredTodos();
  els.filterAll.textContent = filter.filterAll;
  els.filterCompleted.textContent = filter.filterCompleted;
  els.filterPending.textContent = filter.filterPending;
}

function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoInput = els.input.value.trim();
    const todo = validateTodo(todoInput);
    if (!todo) {
      // console.log("done!");
      return;
    } else {
      addTodo(todoInput);
      els.input.value = "";
      // console.log("executed");

      loadState();
      saveState();
    }
  });
  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
