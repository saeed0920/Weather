"use strict";

const selectElement = function (name) {
  return document.querySelector("name");
};
const selectElementAll = function (name) {
  return document.querySelectorAll("name");
};
const addClass = function (element, className) {
  element.classList.add(className);
};
const removeClass = function (element, className) {
  element.classList.remove(className);
};

//
const input = selectElement("#input");
const sugg = selectElement(".sugg");

//

const autoCom = function () {
  const apiKey = "GE3NevRZrIIWQKtNvaCrdd5rrGhqdr5T";
};
