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
const mainUrl = "https://api.weatherapi.com/v1";
const apiKey = "dbc6887461184c36a7b95357232008";

// setup
if (localStorage.getItem.length < 1) {
  addClass(selectElement("#removeArchive"), "hide");
}

// function

const autoComOpen = async function () {
  removeClass(sugg, "scale-y-0");
  removeClass(suggLoading, "hide");
  //
  let url = `${mainUrl}/search.json?key=${apiKey}&q=${input.value.trim()}`;

  try {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    removeElement(".autoCom");
    for (let i = 0; i < 5; i++) {
      if (result[i]) {
        const para = document.createElement("p");
        addClass(para, "autoCom");
        const node = document.createTextNode(
          result[i].name + " " + result[i].region
        );
        para.setAttribute("id", result[i].url);
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

const getWeather = async function (value, setupCondition = true) {
  value ? (value = value) : (value = input.value.trim());
  const urlImg = await getProfileImg(value);
  value = value.toLocaleLowerCase();
  let url = `${mainUrl}/current.json?key=${apiKey}&q=${value}`;
  let check = true;

  if (setupCondition)
    for (let i = 1; i <= localStorage.length; i++) {
      if (localStorage.getItem(i)?.toLocaleLowerCase() == value) {
        check = false;
      }
    }

  if (setupCondition)
    if (check) localStorage.setItem(localStorage.length + 1, value);
  if (check)
    try {
      const response = await fetch(url, {
        headers: {},
      });

      let result = response.json();
      console.log("weather: ", result);

      let conditionText;
      switch (result.current.condition.text) {
        case "Clear":
          conditionText = "blueBg";
          break;
        case "Sunny":
          conditionText = "blueBg";
          break;
        case "Partly cloudy":
          conditionText = "greenBg";
          break;
        case "Cloudy":
          conditionText = "greenBg";
          break;
        case "Rain":
          conditionText = "epicBg";
          break;
        case "Freezing rain":
          conditionText = "epicBg";
          break;
      }

      selectElement(".container").innerHTML += `
    <div class="card ${conditionText}">
    <img src="${urlImg}" />
     <div class="header">
        <h2>${result.current.condition.text}</h2>
        <h1>${result.current.temp_c | 0}&#186;</h1>
        <div>
        <h3>${result.current.last_updated}</h3>
        <h3>${result.location.country + "," + result.location.name}</h3>
        </div>
      </div>
      <img src="${result.current.condition.icon}"  />
   </div>`;
    } catch (error) {
      console.error("Error:", error);
    }
  input.value = null;
};

const getProfileImg = async function (name) {
  name = name.toLocaleLowerCase();

  let url = `https://api.teleport.org/api/urban_areas/slug:${name}/images/`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = response.json();
    console.log("img :", result);
    return result.photos[0].image.web;
  } catch (error) {
    console.log(error);
    return "./img/city.jpg";
  }
};

// event
input.addEventListener("input", function () {
  if (input.value.length > 1) {
    removeElement(".autoCom");
    autoComOpen();
  }
});

searchIcon.addEventListener("click", function () {
  autoComClose();
  getWeather();
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    autoComClose();
    getWeather();
  }
});

sugg.addEventListener("click", function (e) {
  input.value = e.srcElement.textContent;

  autoComClose();
  getWeather(e.srcElement.id);
});

selectElement("#removeArchive").addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

for (let i = 0; i <= localStorage.length; i++) {
  localStorage.getItem(i);
}

// setup page (archive)
const setup = async function () {
  for (let i = 1; i <= localStorage.length; i++) {
    let item = localStorage.getItem(i);
    await getWeather(item, false);
  }
  addClass(selectElement(".mainLoading"), "hide");
};
setup();
