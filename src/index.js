// Add a time stamp

let now = new Date();
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hh = currentDate.getUTCHours();
  // if (hh < 10) {
  //   `0${hh}`;
  // }
  // let mm = currentDate.getMinutes();
  // if (mm < 10) {
  //   `0${mm}`;
  // }
  let mm = String(currentDate.getMinutes()).padStart(2, "0");

  let currDay = days[currentDate.getUTCDay()];

  // let formDate = `${currDay}, ${currDate}`;
  let formDate = `${currDay}, ${hh}:${mm}`;
  return formDate;
}

let currDate = document.querySelector("#curr-date");
currDate.innerHTML = formatDate(now);

// Display the name of the city that is searched
function viewcity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchcity = document.querySelector("#search-city");
  searchcity.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=15132c0c33ce6e6df2635ad5416e41db&&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#search-form");
// let searchCity = document.querySelector("#search-city");

searchForm.addEventListener("submit", viewcity);

function extractPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  //   console.log(apiUrl);

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let currtemp = Math.round(response.data.main.temp);
  let ctempview = document.querySelector("#curr-temp");
  ctempview.innerHTML = `${currtemp}`;
}

function showCurrTemp(response) {
  let currtemp = Math.round(response.data.main.temp);
  let ctempview = document.querySelector("#curr-temp");
  ctempview.innerHTML = `${currtemp}`;
}

function searchLocation(position) {
  let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#curr-loc");
button.addEventListener("click", getCurrentLocation);
