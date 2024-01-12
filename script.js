var city = document.querySelector('#city');
var searchButton = document.querySelector('.search-button');
var cityHistory = document.querySelector('#city-history');
var day1Header = document.querySelector('.day1Header');
var day2Header = document.querySelector('.day2Header');
var day3Header = document.querySelector('.day3Header');
var day4Header = document.querySelector('.day4Header');
var day5Header = document.querySelector('.day5Header');
var day6Header = document.querySelector('.day6Header');
var show = document.querySelector('#display')



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
    show.style.display = 'block'
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&appid=e07e43c9f7374f506438deb827fbe9e6"
    getCity(locationURL)

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

async function getCity(locationURL) {
  const response = await fetch(locationURL)
  const data = await response.json();
  var lat = data[0].lat;
  var lon = data[0].lon;
  var cityName = data[0].name;
  var today = dayjs().format('M/D/YYYY');
  var day2 = dayjs().add(1, 'day').format('M/D/YYYY');
  var day3 = dayjs().add(2, 'day').format('M/D/YYYY');
  var day4 = dayjs().add(3, 'day').format('M/D/YYYY');
  var day5 = dayjs().add(4, 'day').format('M/D/YYYY');
  var day6 = dayjs().add(5, 'day').format('M/D/YYYY');
  var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=e07e43c9f7374f506438deb827fbe9e6"
  $(".day1Header h5").html(`${cityName} (${today})<img src="" id="icon" alt="weather icon">`);
  // $(".day2Header h5").html(`(${day2})<img src="" id="icon" alt="weather icon">`);
  // $(".day3Header h5").html(`(${day3})<img src="" id="icon" alt="weather icon">`);
  // $(".day4Header h5").html(`(${day4})<img src="" id="icon" alt="weather icon">`);
  // $(".day5Header h5").html(`(${day5})<img src="" id="icon" alt="weather icon">`);
  // $(".day6Header h5").html(`(${day6})<img src="" id="icon" alt="weather icon">`);

  getWeather(weatherURL)
}
async function getWeather(weatherURL) {
  const response = await fetch(weatherURL)
  const data = await response.json();
  var temp = data.list[0].main.temp;
  var icon = data.list[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  var weather = data.list[0].weather[0].description;
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity
  $('#icon').attr("src", `${iconurl}`);
  $('#weather1').html(`<p> Temp: ${temp} </p><p>Wind Speed: ${wind} </p><p>Humidity: ${humidity} </p>`);
  for (i = 1; i < 6; i++) {
    var temp = data.list[i].main.temp;
    var icon = data.list[i].weather[0].icon;
    var weather = data.list[i].weather[0].description;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity
    var day2 = dayjs().add(i, 'day').format('M/D/YYYY');
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    // $('#icon').attr("src", `${iconurl}`);
    $('#weather2').html(`<div class="col-md-2" ><div class="card day2Header"><h5 class="card-header">(${day2})<img src="${iconurl}" id="icon" alt="weather icon"></h5><div class="card-body"><p> Temp: ${temp} </p><p>Wind Speed: ${wind} </p><p>Humidity: ${humidity} </p></div></div></div>`);
  }


}





{/* <div class="col-md-2" ><div class="card day2Header"><h5 class="card-header"></h5><div class="card-body weather2"><p class="card-text">Weather</p></div></div></div> */}


// $('#weather2').html(`<p> Temp: ${temp} </p><p>Wind Speed: ${wind} </p><p>Humidity: ${humidity} </p>`);