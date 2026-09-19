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

// [T1-01]

function validateExpense(name, amount) {
  els.nameErrorMessage.textContent = "";
  els.amountErrorMessage.textContent = "";
  let valid;

  if (name === "") {
    els.nameErrorMessage.textContent = "Name is required";
    els.nameErrorMessage.style.color = "red";
    valid = false;
  } else if (isNaN(name)) {
    els.nameErrorMessage.textContent = "Name should not be a number";
    els.nameErrorMessage.style.color = "red";
    valid = false;
  } else if (amount === "") {
    els.amountErrorMessage.textContent = "Amount is required";
    els.amountErrorMessage.style.color = "red";
    valid = false;
  } else if (isNaN(amount)) {
    els.amountErrorMessage.textContent = "Amount must be a number";
    els.amountErrorMessage.style.color = "red";
    valid = false;
  } else if (amount <= 0) {
    els.amountErrorMessage.textContent = "Amount must be a positive number";
    els.amountErrorMessage.style.color = "red";
    valid = false;
  } else {
    valid = true;
  }
  return valid;
}

function generateId() {
  return Date().toString();
}

// [T1-02]
function addExpense(name, amount) {
  expenses.push({
    id: generateId(),
    name,
    amount: Number(amount),
  });

  renderExpenses();
  renderSummary();
}

// [T1-03]
function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  renderSummary();
}

// [T1-04]
function calculateTotal() {
  return expenses.reduce((sum, expense) => sum + expense["amount"], 0);
}

// [T1-05]
function renderExpenses() {
  els.list.innerHTML = "";
  expenses.forEach((expense) => {
    let anExpense = document.createElement("li");
    anExpense.className = "expense-list-item";
    let expenseName = document.createElement("span");
    expenseName.textContent = expense.name;
    let expenseAmount = document.createElement("span");
    expenseAmount.textContent = expense.amount;
    expenseAmount.style.marginLeft = "2rem";
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "⨉";
    deleteBtn.style.marginLeft = "2rem";
    deleteBtn.className = "remove-expense-btn";
    deleteBtn.dataset.id = expense.id;

    anExpense.appendChild(expenseName);
    anExpense.appendChild(expenseAmount);
    anExpense.appendChild(deleteBtn);
    els.list.appendChild(anExpense);
  });

  if (expenses.length == 0) {
    els.empty.style.display = "flex";
  } else {
    els.empty.style.display = "none";
  }
}

// [T1-06]
function renderSummary() {
  els.total.textContent = calculateTotal(expenses).toFixed(1) + " FCFA";
  els.count.textContent = expenses.length;
}

// [T1-07]
function init() {
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = els.name.value.trim();
    const amount = els.amount.value.trim();
    const result = validateExpense(name, amount);

    if (result.valid === false) {
      els.name.value = "";
      els.amount.value = "";
    } else {
      addExpense(name, amount);

      els.name.value = "";
      els.amount.value = "";
    }
  });

  els.list.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      removeExpense(event.target.dataset.id);
    }
  });

  renderExpenses();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", init);
