"use strict";

// basic functions
const selectElement = function (name) {
  return document.querySelector(name);
};
const selectElementAll = function (name) {
  return document.querySelectorAll(name);
};
const addClass = function (element, className) {
  return element.classList.add(className);
};
const removeClass = function (element, className) {
  return element.classList.remove(className);
};
const removeElement = function (name) {
  const elements = selectElementAll(name);
  for (const child of elements) {
    child.remove();
  }
};
// variables
const input = selectElement("#input");
const sugg = selectElement(".sugg");
const suggLoading = selectElement(".sugg__loading");
const searchIcon = selectElement("#icon");
let checkInput = true;
// function

const autoComOpen = async function () {
  removeClass(sugg, "scale-y-0");
  removeClass(suggLoading, "hide");
  checkInput = false;
  //
  const apiKey = "3wFMzAKfdShvZA0kXCcjf5IMFo01jrMe";
  let url = `http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=5&offset=0&types=CITY&namePrefix=${input.value}&sort=-population`;

  try {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    result = result.data;
    console.log("Success:", result);
    checkInput = true;
    removeElement(".autoCom");
    for (let i = 0; i < 5; i++) {
      if (result[i]) {
        const para = document.createElement("p");
        addClass(para, "autoCom");
        const node = document.createTextNode(result[i].name);
        para.appendChild(node);
        sugg.appendChild(para);
      } else break;
    }
    if (result.length === 0) {
      addClass(sugg, "scale-y-0");
      addClass(suggLoading, "hide");
    }

    addClass(suggLoading, "hide");
  } catch (error) {
    console.error("Error:", error);
  }
};

const autoComClose = function () {
  addClass(sugg, "scale-y-0");
  addClass(suggLoading, "hide");
  //
};

const getWeather = function () {};

// event
input.addEventListener("input", function () {
  if (input.value.length > 1 && checkInput) {
    removeElement(".autoCom");
    autoComOpen();
  }
});

searchIcon.addEventListener("click", function () {
  autoComClose();
  getWeather();
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    autoComClose();
    getWeather();
  }
});

sugg.addEventListener("click", function (e) {
  input.value = e.srcElement.textContent;
  autoComClose();
  getWeather();
});
