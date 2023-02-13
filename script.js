// variables for form input
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');

// variables for search history 
var searchHistory = [];
var cityInputs = document.querySelector('#search-history');


// event listeners
userFormEl.addEventListener('submit', formSubmitHandler);

// user inputs a city name and we first first get coordinates and set cities to local storage
function formSubmitHandler(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
    if (cityName) {
      getCoordinates(cityName);
      cityInputs.textContent = '';
      // cityName.value = '';

    } else {
      return;

    }
 // push search bar value in saved
searchHistory.push(cityName);
cityInputEl.value = "";
// set localStorage historyList item with saved
localStorage.setItem("searchHistoryList", JSON.stringify(searchHistory));
// call listBuilder function and pass search bar value as a argument
listCities();

// set search bar value to ""(empty string)
// var reset = document.querySelector('form').reset();
  };

function listCities() {
  cityInputs.innerHTML = "";
  cityInputs.textContent = searchHistory.length;
  // Render a new li for each cityInput
  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    cityInputs.appendChild(li);
  }
}
// This function is being called below and will run when the page loads.
function init() {
  // Get stored cityInputs from localStorage
  var storedSearches = JSON.parse(localStorage.getItem("searchHistory"));

  // If cityInputs were retrieved from localStorage, update the searchHistory array to it
  if (storedSearches !== null) {
    searchHistory = storedSearches;
  }

  // This is a helper function that will render todos to the DOM
  listCities();
}



// function to call coordinates and then initiate function to display current weather
function getCoordinates (cityName) {
      var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=ac721f3e341fb446253df6241582894c";
      
      fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(data);
            getWeatherForecast(lat, lon);
          });
        } else {
          console.log('Api is not working')
        }
      })
      document.querySelector("#search-term").textContent = cityName;
    }
    

//get the weather forecast based on city latitude & longitude
function getWeatherForecast(lat, lon) { 
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=ac721f3e341fb446253df6241582894c";

    fetch(forecastUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var date = data.list[0].dt_txt;
            var icon = data.list[0].weather[0].icon;
            var temp = data.list[0].main.temp + "F";
            var wind = data.list[0].wind.speed + "MPH";
            var humid = data.list[0].main.humidity + "%";
            var fiveDays = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
            console.log(date);
            console.log(temp, wind, humid);
          
            showCurrentWeather(date, icon, temp, wind, humid);
            
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
  currentWeatherContainer.innerHTML =`<p>Date: ${date}</p><p>Temperature: ${temp}</p><p>Wind: ${wind}</p><p>Humidity: ${humid}</p>`;
  var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#icon").src = iconUrl;
  var iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  document.body.appendChild(iconImg);

}

function showFutureWeather(fiveDays) {
  for (var i = 0; i < fiveDays.length; i++) {
    console.log(fiveDays[i])

    var icon = fiveDays[i].weather[0].icon;
    var date = fiveDays[i].dt_txt;
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
    iconImg.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    weatherContainer.append(iconImg);

    futureWeather.append(weatherContainer);

    weatherContainer.setAttribute("class", "weatherContainer")
  }
}

init();
