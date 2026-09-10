/**
 * Skye8 JavaScript Practical Assessment
 * Task 1 - Interactive Expense Calculator
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("expense-form"),
  name: document.getElementById("expense-name"),
  amount: document.getElementById("expense-amount"),
  list: document.getElementById("expense-list"),
  total: document.getElementById("expense-total"),
  count: document.getElementById("expense-count"),
  empty: document.getElementById("expense-empty"),
  nameErrorMessage: document.getElementById("expense-name-error"),
  amountErrorMessage: document.getElementById("expense-amount-error"),
};

/** @type {{ id: string, name: string, amount: number }[]} */
let expenses = [];

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
function validateExpense(name, amount) {
  if (name.value === "") {
    nameErrorMessage.textContent = "Name is required";
    nameErrorMessage.style.color = "red";
  }
  if (amount.value === "") {
    amountErrorMessage.textContent = "Amount is required";
    amountErrorMessage.style.color = "red";
  } else if (isNaN(amount.value)) {
    amountErrorMessage.textContent = "Amount must be a number";
    amountErrorMessage.style.color = "red";
  } else if (amount.value <= 0) {
    amountErrorMessage.textContent = "Amount must be a positive number";
    amountErrorMessage.style.color = "red";
  } else {
    nameErrorMessage.textContent = "";
    amountErrorMessage.textContent = "";
    return { valid: true, errors: {} };
  }
}

// Generates a unique id for each expense.
function generateId() {
  return expenses.length + 1;
}

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  expenses.push({
    id: generateId(),
    name: name.value,
    amount: Number(amount.value),
  });
}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {}

// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  return 0;
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {}

function init() {
  // TODO [T1-07]: Bind the form submit and the delete delegation, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
