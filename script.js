var city = document.querySelector('#city');
var searchButton = document.querySelector('.search-button');
var cityHistory = document.querySelector('#city-history');
// var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=e07e43c9f7374f506438deb827fbe9e6" 



var cityList = [];

init()

//Creates a function to list the searched cities
function renderCities() {

  cityHistory.innerHTML = "";

  for (var i = 0; i < cityList.length; i++) {
    var cities = cityList[i];

    var button = document.createElement("button");
    button.textContent = cities;
    button.setAttribute("data-index", i);

    cityHistory.appendChild(button);
  }
}

//Checks on launch if it needs to populate the seached cities history buttons
function init() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
}

//Listener that creates a button for cities searched
searchButton.addEventListener("click", function (event) {
  if (city.value != '') {
    event.preventDefault();
    localStorage.setItem("city", city.value.toUpperCase());
    city.value.trim();
    if (!cityList.includes(city.value.toUpperCase())) 
    cityList.push(city.value.toUpperCase());
    storeCities();
    renderCities();
    // var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value.trim() + "&appid=e07e43c9f7374f506438deb827fbe9e6"
    // fetch(locationURL)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
    // fetch(weatherURL);
    // document.querySelector("day1Header").innerHTML = fetch(locationURL).name
  }
  else {
    event.preventDefault();
    return;
  }
});

//Stores searched cities in local storage
function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cityList));

}
