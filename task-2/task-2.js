/**
 * Skye8 JavaScript Practical Assessment
 * Task 2 - Student Grade Manager
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("student-form"),
  name: document.getElementById("student-name"),
  score: document.getElementById("student-score"),
  list: document.getElementById("student-list"),
  average: document.getElementById("stat-average"),
  highest: document.getElementById("stat-highest"),
  lowest: document.getElementById("stat-lowest"),
  count: document.getElementById("stat-count"),
  empty: document.getElementById("student-empty"),
  nameErrorMessage: document.getElementById("student-name-error"),
  scoreErrorMessage: document.getElementById("student-score-error"),
};

/** @type {{ id: string, name: string, score: number, grade: string }[]} */
let students = [];

// TODO [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
function getGrade(score) {
  if (score >= 80 && score <= 100) {
    return "A";
  } else if (score >= 70 && score <= 79) {
    return "B";
  } else if (score >= 60 && score <= 69) {
    return "C";
  } else if (score >= 50 && score <= 59) {
    return "D";
  } else {
    return "F";
  }
}

// TODO [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a
// score above 100.
function validateStudent(name, score) {
  els.nameErrorMessage.textContent = "";
  els.scoreErrorMessage.textContent = "";
  let valid = true;

  if (name === "") {
    els.nameErrorMessage.textContent = "Name is required";
    valid = false;
  } else if (!isNaN(name)) {
    els.nameErrorMessage.textContent = "Name must be text";
    valid = false;
  }

  if (score === "") {
    els.scoreErrorMessage.textContent = "Score is required";
    valid = false;
  } else if (isNaN(score)) {
    els.scoreErrorMessage.textContent = "Score must be a number";
    valid = false;
  } else if (Number(score) < 0 || Number(score) > 100) {
    els.scoreErrorMessage.textContent = "Score must be between 0 and 100";
    valid = false;
  }
  return valid;
}

function studentId() {
  return Date().toString();
}

// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
  students.push({
    id: studentId(),
    name,
    score: Number(score),
    grade: getGrade(score),
  });

  renderStats();
  renderStudents();
}

// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {
  students = students.filter((student) => student.id != id);
  renderStats();
  renderStudents();
}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {
  if (students.length === 0) {
    return { average: "-", highest: "-", lowest: "-", count: 0 };
  }

  // const scores = students.map((student) => {
  //   // New list that has all the scores of the students.
  //   return student.score;
  // });

  const total = students.reduce((sum, student) => {
    return sum + student.score;
  }, 0);
  const smallestScore = students.reduce((smallest, student) => {
    return Math.min(smallest, student.score);
  }, 1000);

  const highestScore = students.reduce((highest, student) => {
    return Math.max(highest, student.score);
  }, 0);

  const average = (total / students.length).toFixed(1);

  return {
    average: average,
    highest: highestScore,
    lowest: smallestScore,
    count: students.length,
  };
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {
  if (students.length == 0) {
    els.empty.style.display = "flex";
  } else {
    els.empty.style.display = "none";
  }

  const statistics = calculateStats();
  els.highest.textContent = statistics.highest;
  els.lowest.textContent = statistics.lowest;
  els.count.textContent = statistics.count;
  els.average.textContent = statistics.average;
}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.
  els.form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = els.name.value.trim();
    const score = els.score.value.trim();
    const studentResult = validateStudent(name, score);

    if (!studentResult) {
      return;
    } else {
      addStudent(name, score);
      els.name.value = "";
      els.score.value = "";
    }
  });

  renderStats();
  renderStudents();
}

document.addEventListener("DOMContentLoaded", init);
