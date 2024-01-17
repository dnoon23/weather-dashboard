//Selectors to select certain parts of the html
var city = document.querySelector('#city');
var searchButton = document.querySelector('.search-button');
var cityHistory = document.querySelector('#city-history');
var day1Header = document.querySelector('.day1Header');
var day2Header = document.querySelector('.day2Header');
var show = document.querySelector('#display')

//Array to store searched cities
var cityList = [];

//Populates the page with buttons from the search history
init()

//Creates a function to list the searched cities
function renderCities() {
  cityHistory.innerHTML = "";
  for (var i = 0; i < cityList.length; i++) {
    var cities = cityList[i];
    var button = document.createElement("button");
    button.textContent = cities;
    button.setAttribute("data-index", i, id = "search");
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

//Listener that searches for the city in the input field
searchButton.addEventListener("click", function (event) {
  if (city.value != '') {
    init()
    event.preventDefault();
    localStorage.setItem("city", city.value.toUpperCase());
    if (!cityList.includes(city.value.toUpperCase()))
      cityList.push(city.value.toUpperCase());
    storeCities();
    renderCities();
    show.style.display = 'block';
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&appid=e07e43c9f7374f506438deb827fbe9e6"
    console.log(locationURL);
    getCity(locationURL);
  }
  else {
    event.preventDefault();
    return;
  }
});

//Allows the buttons that were created using the search history to be used on page load
var nodes = document.getElementsByTagName('button');
for (var i = 1; i < nodes.length; i++) {
  nodes[i].addEventListener('click', function (i) {
    show.style.display = 'block'
    console.log('You clicked element #' + i);
    console.log(cityList[i - 1])
    var newCity = cityList[i - 1]
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&appid=e07e43c9f7374f506438deb827fbe9e6"
    console.log(locationURL)
    getCity(locationURL)
  }.bind(null, i));
}

//Stores searched cities in local storage
function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cityList));
}

//Uses the location url created above to get the weather data 
async function getCity(locationURL) {
  const response = await fetch(locationURL)
  const data = await response.json();
  $('#weather2 div').remove()
  var lat = data[0].lat;
  var lon = data[0].lon;
  var cityName = data[0].name;
  var today = dayjs().format('M/D/YYYY');
  var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=e07e43c9f7374f506438deb827fbe9e6"
  $(".day1Header h5").html(`${cityName} (${today})<img src="" id="icon" alt="weather icon">`);
  getWeather(weatherURL)
}

//Uses the weather data to populate the card representing today
async function getWeather(weatherURL) {
  const response = await fetch(weatherURL)
  const data = await response.json();
  var temp = data.list[0].main.temp;
  var icon = data.list[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity
  $('#icon').attr("src", `${iconurl}`);
  $('#weather1').html(`<p> Temp: ${Math.round(((temp - 273.15) * 1.8 + 32) * 100) / 100}°F</p><p>Wind Speed: ${wind} mph</p><p>Humidity: ${humidity}% </p>`);
  city.value = '';

  //Populates the cards for the next 5 days
  for (let k = 1; k < data.list.length; k++) {
    if (k % 7 === 0) {
      var temp = data.list[k].main.temp;
      var icon = data.list[k].weather[0].icon;
      var wind = data.list[k].wind.speed;
      var humidity = data.list[k].main.humidity
      var day2 = dayjs().add(k / 7, 'day').format('M/D/YYYY');
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#weather2').append(`<div class="col-lg-2 mx-auto" ><div class="card day2Header"><h5 class="card-header bg-primary text-white">(${day2})<img src="${iconurl}" id="icon" alt="weather icon"></h5><div class="card-body"><p> Temp: ${Math.round(((temp - 273.15) * 1.8 + 32) * 100) / 100}°F</p><p>Wind Speed: ${wind} mph</p><p>Humidity: ${humidity}% </p></div></div></div>`);
    }
  }

  //Allows for the history buttons to be used after a search
  var nodes = document.getElementsByTagName('button');
  for (var i = 1; i < nodes.length; i++) {
    nodes[i].addEventListener('click', function (i) {
      init()
      show.style.display = 'block'
      console.log('You clicked element #' + i);
      console.log(cityList[i - 1])
      var newCity = cityList[i - 1]
      var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&appid=e07e43c9f7374f506438deb827fbe9e6"
      console.log(locationURL)
      getCity(locationURL)
    }.bind(null, i));
  }
}
