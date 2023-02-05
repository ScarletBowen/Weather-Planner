var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');
var citySubmitButtonEl = document.querySelector('citySubmit');
var dateEL = document.getElementById('date');
var currentWeatherItemsEl = document.querySelector('currentWeatherItems')
var containerEl = document.querySelector('container');
var searchTerm = document.querySelector('search-term');
var futureForecastEL = document.querySelector('future-forecast');


userFormEl.addEventListener('submit', formSubmitHandler);
// cityInputEl.addEventListener('click', formSubmitHandler);
// citySubmitButtonEl.addEventListener('click',formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
    if (cityName) {
      getCoordinates(cityName);
      console.log();
      containerEl.textContent = '';
      cityName.value = '';
    } else {
      return;
      // window.alert('Please enter a city name');
    }
  };
  

  // set variables for lat and lon; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  var locationData = getCoordinates(cityName);
  var lon = locationData.coord.lon;
  var lat = locationData.coord.lat;

function getCoordinates (cityName) {
      var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ac721f3e341fb446253df6241582894c";
      
      fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log('data?')
            return true
          });
        } else {
          console.log('Api is not working')
        }
      })
      .catch(function (error) {
        alert('Enter a city name');
      });
  }

  
  // console.log(results);

// var buttonClickHandler = function (event) {
//   var prevCity = event.target.getAttribute('first-city');

//   if (prevCity) {
//     getStoredData(prevCity);

//     containerEl.textContent = '';
//   }
// };

// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=ac721f3e341fb446253df6241582894c'

// 

// var getFeaturedRepos = function (language) {
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

// var showWeather = function (data, searchTerm) {
//   if (weather.length === 0) {
//     containerEl.textContent = 'No city weather forecast found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

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

