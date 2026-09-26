<!--
Skye8 JavaScript Practical Assessment - submission template.
Fill in every section. An incomplete template is returned unreviewed.
Delete nothing except these comment blocks.
-->

## Submission

| Field           | Value                         |
| --------------- | ----------------------------- |
| Full name       | Tsoala Tissock Ranjoy Bryan   |
| GitHub username | tissockbryan-max              |
| Cohort          | 2                             |
| Branch          | `assessment/tissockbryan-max` |
| Date submitted  | Monday, 14th september 2026   |

## Hosted application

Live URL: https://js-assessment-ranjoy.netlify.app/

Hosting platform: Netlify

## Repository

Fork URL: https://github.com/tissockbryan-max/skye8-js-assessment

## Completed tasks

Tick only what is complete and working on the hosted site.

- [ ✔ ] Task 1 - Interactive Expense Calculator
- [ ✔ ] Task 2 - Student Grade Manager
- [ ] Task 3 - Persistent To-Do Application
- [ ] Task 4 - Product Search, Filter and Sort
- [ ] Task 5 - Interactive Sales Dashboard

## Requirement checklist

### Task 1

- [ ✔ ] Expenses stored as objects in an array
- [ ✔ ] List rendered from state, nothing hardcoded
- [ ✔ ] Total derived on demand
- [ ✔ ] Total and count update on add and on delete
- [ ✔ ] Validation covers empty, non-numeric, zero and negative
- [ ✔ ] Empty state returns after deleting the last row

### Task 2

- [ ✔ ] Students stored as objects with a derived grade
- [ ✔ ] Grade banding implemented as a single function
- [ ✔ ] Average, highest, lowest and count all derived
- [ ✔ ] Average shown to one decimal place
- [ ✔ ] Validation covers empty name and out-of-range scores
- [ ✔ ] No `NaN` with zero students

### Task 3

- [ ] Add, complete, revert and delete all work
- [ ] Three filters work and show an active state
- [ ] Counters derived, not incremented
- [ ] Persists across a refresh under `skye8.task3.todos`
- [ ] `JSON.parse` guarded by `try/catch`
- [ ] Empty and whitespace-only tasks rejected

### Task 4

- [ ] Renders from the provided dataset
- [ ] Search, category filter and price filter all work
- [ ] Sort ascending and descending
- [ ] Search, filter and sort compose without resetting each other
- [ ] Live visible-product count
- [ ] Distinct empty state for no matches
- [ ] Source dataset never mutated

### Task 5

- [ ] All six KPIs derived, none hardcoded
- [ ] KPIs recalculate against the filtered set
- [ ] Dynamic table built from the dataset
- [ ] Search, filter and sort compose
- [ ] Safe values when nothing matches, no `NaN` and no `Infinity`
- [ ] Currency formatted consistently
- [ ] Table scrolls rather than overflowing on mobile

### Cross-cutting

- [ ] Zero console errors on every page
- [ ] Tested at 360px, 768px and 1280px
- [ ] Every input has a bound label
- [ ] Actions use `<button>`, not clickable `<div>`
- [ ] No unescaped `innerHTML` with user input
- [ ] No framework, no bundler, no npm dependency
- [ ] No dead code, no leftover `console.log`
- [ ] All five dashboard links work on the hosted site
- [ ] Every task page returns to the dashboard

## Testing performed

<!-- What you actually did, not what you intended to do. Name the edge
     cases you tried and what happened. -->

| Task | Normal case                                               | Invalid input                                               | Edge case                                                | Console                                  |
| ---- | --------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------- |
| 1    | Entered valid expense name an amount to see effect        | Tried inputing a number in place of a string and vice-versa | Entered multiple values but the page didn't break at all | Errors occured while validating the form |
| 2    | Inputed text as a description and the input was validated | Entered a number and made it display an error               | Entered a number and made it display an error            | Errors occured while validating the form |
| 3    |                                                           |                                                             |                                                          |                                          |
| 4    |                                                           |                                                             |                                                          |                                          |
| 5    |                                                           |                                                             |                                                          |                                          |

## Challenges encountered

I had Internet challenges and electrical challenges.
I had difficulties understanding the instructions and the specific requirements for the project.
Therefore I had to read the congested README.md file repeatedly for better understanding.
I also had challenges managing my time. It was difficult to carryout this task while planning and doing other daily
activities.

## Additional features

## AI assistance

I used it to learn how higher order functions like .map(), .filter() and .reduce() functions function.

## Known issues

When an empty form is submited, it is still added to the expense list.
I tried to debug it but had no solution.

## Notes for the reviewer

### Author confirmation

- [ ✔ ] I have opened the hosted URL above and used all five applications on it
- [ ✔ ] I wrote this code and can explain every part of it
- [ ✔ ] I have read `GRADING.md` and checked my submission against it

Submitted to: Skye8 JavaScript Practical Assessment - SKY8-JSA-001
Maintainer: Engr. Lionel A.
