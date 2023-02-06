// variables for form input
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');
var citySubmitButtonEl = document.querySelector('citySubmit');

// variables for weather information
var searchTermEl = document.getElementById ("#search-term")
var dateEL = document.getElementById('date');
var containerEl = document.querySelector('container');

// variables for search history 
var futureForecastEL = document.querySelector('future-forecast');

// event listeners
userFormEl.addEventListener('submit', formSubmitHandler);
// cityInputEl.addEventListener('click', formSubmitHandler);
// citySubmitButtonEl.addEventListener('click',formSubmitHandler);

// user inputs a city name and we first first get coordinates
function formSubmitHandler(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
    if (cityName) {
      getCoordinates(cityName);
      // containerEl.textContent = '';
      // cityName.value = '';
    } else {
      return;
      // window.alert('Please enter a city name');
    }
  };

//Display city name on page
// document.querySelector("#search-term").textContent = cityName.toUpperCase();

// var buttonClickHandler = function (event) {
//   var prevCity = event.target.getAttribute('first-city');

//   if (prevCity) {
//     getStoredData(prevCity);

//     containerEl.textContent = '';
//   }
// };

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
      
    }
    

//get the weather forecast based on city latitude & longitude
function getWeatherForecast(lat, lon) { 
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=ac721f3e341fb446253df6241582894c";
    console.log();

    fetch(forecastUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            var date = data.list[0].dt_txt;
            var temp = data.list[0].main.temp + "F";
            var wind = data.list[0].wind.speed + "MPH";
            var humid = data.list[0].main.humidity + "%";

            console.log(data);
          showWeatherForecast();
          });
        } else {
          console.log('Api is not working')
        }
      })
    }
    

// This strategy for displaying the data was inspired by this youtube: https://www.youtube.com/watch?v=Mc1w6Q-nxzM
function showWeatherForecast(date, temp, wind, humid) {
  var currentWeatherItemsEl = document.querySelector("currentWeatherItems");

  var date = document.createElement("p");
  date.textContent = date;
  currentWeatherItemsEl.append(date);

  var temp = document.createElement("p");
  temp.textContent = temp;
  currentWeatherItemsEl.append(temp);

  var wind = document.createElement("p");
  wind.textContent = wind;
  currentWeatherItemsEl.append(wind);

  var humid = document.createElement("p");
  humid.textContent = humidity;
  currentWeatherItemsEl.append(humid);

}

// var showWeather = function (data, searchTerm) {
//   if (weather.length === 0) {
//     containerEl.textContent = 'No city weather forecast found.';
//     return;
//   }
// }


//display the weather icons on the page
// function getIcons(weatherData) {
//   for (let i = 0; i < 6; i++) {
//     weatherIcon = weatherData[i].weather[0].icon;
//     iconElement = document.querySelector(`#icon-${i}`);
//     iconElement.src =
//       "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
//   }
// }

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('a');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';
//     repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };

