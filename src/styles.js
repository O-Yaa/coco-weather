function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

///////Displaying the Forecast///////
function showForecast(response) {
  let forecast = response.data.daily;

  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  ////to be able to create loop;
  let forecastHTML = `<div class="row">`;
  //create new array with days, and loop through forEach
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

/////create the function getForecast(coordinates)
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  let temperatureElement = document.querySelector("#temp-now");

  celsTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsTemp);

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  ///create function to call the forecast info using coordinates. Call the function in here, and create the function on top
  ///of this showTemp(response) function

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a4f89a00246b94464bcc73cf83f9813a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-now");
  //remove the active class from the celsius and add to fahrenheit
  celsElement.classList.remove("active");
  fahrElement.classList.add("active");
  let fahrTemp = (celsTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrTemp);
}

function showCelsTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-now");
  //remove active class from fahrenheit and add to celsius
  celsElement.classList.add("active");
  fahrElement.classList.remove("active");
  tempElement.innerHTML = Math.round(celsTemp);
}

let celsTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrElement = document.querySelector("#fahrenheit");
fahrElement.addEventListener("click", showFahrTemp);

let celsElement = document.querySelector("#celsius");
celsElement.addEventListener("click", showCelsTemp);

search("New York");
//////call the forecast function
