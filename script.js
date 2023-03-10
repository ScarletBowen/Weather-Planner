// variables for form input
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');

// variables for search history 
var searchHistory = [];
var cityInputs = document.querySelector('#search-history');


// initial search event listener
userFormEl.addEventListener('submit', formSubmitHandler);

// user inputs a city name and we first first get coordinates and set cities to local storage
function formSubmitHandler(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getCoordinates(cityName);
    // cityInputs.textContent = '';

  } else {
    return;

  }
  // push search bar value in saved
  searchHistory = JSON.parse(localStorage.getItem("searchHistoryList")) || [];
  searchHistory.push(cityName);
  cityInputEl.value = "";
  // set localStorage historyList item with saved
  localStorage.setItem("searchHistoryList", JSON.stringify(searchHistory));
  // call listBuilder function and pass search bar value as a argument
  createButton(cityName);
};

// create buttons with previous cities searched
function createButton(cityName) {
  var btn = document.createElement("button");
  btn.textContent = cityName;
  // create event listener for when buttons are clicked
  btn.addEventListener("click", function () {
    console.log(cityName);
    getCoordinates(cityName);
  });
  cityInputs.appendChild(btn);
}

// create buttons with previous cities searched
function loadSearchHistory() {
 
  searchHistory = JSON.parse(localStorage.getItem("searchHistoryList")) || [];
  console.log(searchHistory);
  // Render a new li for each cityInput
  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];
    console.log("first loop", city);

    var btn = document.createElement("button");
    btn.textContent = city;
    city.value = city;
    btn.setAttribute("data-index", i);
    // create event listener for when buttons are clicked
    btn.addEventListener("click", function () {
      console.log(city);
      getCoordinates(city);
    });
    cityInputs.appendChild(btn);
  }
}
loadSearchHistory();

// This function is being called below and will run when the page loads.
function init() {
};

// function to call coordinates and then initiate function to display current weather
function getCoordinates(cityName) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + cityName + "&appid=ac721f3e341fb446253df6241582894c";
  console.log(cityName);
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var date = new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
          var icon = data.weather[0].icon;
          var temp = data.main.temp + " F";
          var wind = data.wind.speed + " MPH";
          var humid = data.main.humidity + " %";
          var lat = data.coord.lat;
          var lon = data.coord.lon;

          getWeatherForecast(lat, lon);
          showCurrentWeather(date, icon, temp, wind, humid);
        });
      } else {
        console.log('Api is not working')
      }
      document.querySelector("#search-term").textContent = cityName;
    })

}


//get the weather forecast based on city latitude & longitude
function getWeatherForecast(lat, lon) {
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=ac721f3e341fb446253df6241582894c";

  fetch(forecastUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          var fiveDays = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
          console.log(data);

          showFutureWeather(fiveDays);
        });
      } else {
        console.log('Api is not working')
      }
    })
}

// This strategy for displaying the data was inspired by this youtube: https://www.youtube.com/watch?v=Mc1w6Q-nxzM
function showCurrentWeather(date, icon, temp, wind, humid) {

  var currentWeatherContainer = document.getElementById("currentWeatherItems");
  currentWeatherContainer.innerHTML = `<p>Date: ${date}</p><p>Temperature: ${temp}</p><p>Wind: ${wind}</p><p>Humidity: ${humid}</p>`;
  var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#icon").src = iconUrl;
  var iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  document.body.appendChild(iconImg);

}

function showFutureWeather(fiveDays) {
  $("#futureContainer").empty();
  for (var i = 0; i < fiveDays.length; i++) {
    console.log(fiveDays[i])
    
    var icon = fiveDays[i].weather[0].icon;
    var date = fiveDays[i].dt_txt.substring(0, 10);
    var temp = fiveDays[i].main.temp + " F" + " Temperature";
    var wind = fiveDays[i].wind.speed + " MPH" + " Wind";
    var humid = fiveDays[i].main.humidity + " %" + " Humidity";

    var futureWeather = document.querySelector("#futureContainer");
    var weatherContainer = document.createElement('div');

    var day = document.createElement('p');
    day.textContent = date;
    weatherContainer.append(day);

    var temperature = document.createElement('p');
    temperature.textContent = temp;
    weatherContainer.append(temperature);

    var windspeed = document.createElement('p');
    windspeed.textContent = wind;
    weatherContainer.append(windspeed);

    var humidity = document.createElement('p');
    humidity.textContent = humid;
    weatherContainer.append(humidity);

    var iconImg = document.createElement('img');
    iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherContainer.append(iconImg);

    futureWeather.append(weatherContainer);

    weatherContainer.setAttribute("class", "weatherContainer")
  }
}

init();
// add a clear button to the page
var clearBtn = document.createElement("button");
clearBtn.textContent = "Clear Search History";
clearBtn.addEventListener("click", clearSearchHistory);
cityInputs.appendChild(clearBtn);

// function to clear the search history
function clearSearchHistory() {
  localStorage.removeItem("searchHistoryList");
  searchHistory = [];
  cityInputs.innerHTML = "";
}
