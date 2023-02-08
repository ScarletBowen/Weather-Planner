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

// Display city name on page

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
      document.querySelector("#search-term").textContent = cityName;
    }
    

//get the weather forecast based on city latitude & longitude
function getWeatherForecast(lat, lon) { 
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=ac721f3e341fb446253df6241582894c";
    

    fetch(forecastUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
           
            var temp = data.list[0].main.temp + "F";
            var wind = data.list[0].wind.speed + "MPH";
            var humid = data.list[0].main.humidity + "%";
            var dates = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
          showCurrentWeatherForecast(temp, wind, humid);
          showFutureWeather(dates);
          });
        } else {
          console.log('Api is not working')
        }
      })
    }
    
            

// This strategy for displaying the data was inspired by this youtube: https://www.youtube.com/watch?v=Mc1w6Q-nxzM
function showCurrentWeatherForecast(temp, wind, humid) {
  // var citySearch = document.querySelector("#search-term");
  var currentTempEl = document.querySelector("#temp");
  var currentWindEl = document.querySelector("#wind");
  var currentHumidEl = document.querySelector("#humid");
  
  // var day = document.createElement('p');
  // day.textContent = date;
  // currentWeatherItemsEl.append(date);

  var temperature = document.createElement('p');
  temperature.textContent = temp;
  currentTempEl.appendChild(temperature);

  var windspeed = document.createElement('p');
  windspeed.textContent = wind;
  currentWindEl.appendChild(windspeed);

  var humidity = document.createElement('p');
  humidity.textContent = humid;
  currentHumidEl.appendChild(humidity);
}

function showFutureWeather(dates) {
  for (var i = 0; i < dates.length; i++) {
    console.log(dates[i])
    var temp = dates[i].main.temp + "F";
    var wind = dates[i].wind.speed + "MPH";
    var humid = dates[i].main.humidity + "%";
    var futureWeather = document.querySelector("#futureContainer");
    var weatherContainer = document.createElement('div');
    var temperature = document.createElement('p');
    temperature.textContent = temp;
    weatherContainer.append(temperature)
    var windspeed = document.createElement('p');
    windspeed.textContent = wind;
    weatherContainer.append(windspeed)
 
   var humidity = document.createElement('p');
    humidity.textContent = humid;
    weatherContainer.append(humidity)

    futureWeather.append(weatherContainer);

    weatherContainer.setAttribute("class", "weatherContainer")
  }

}




//display the weather icons on the page--example
// function getIcons(weatherData) {
//   for (let i = 0; i < 6; i++) {
//     weatherIcon = weatherData[i].weather[0].icon;
//     iconElement = document.querySelector(`#icon-${i}`);
//     iconElement.src =
//       "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
//   }
// }



