window.onload = function() {

var searchBtn = document.querySelector("#searchBtn")
var cityInput = document.querySelector("#cityInput")
var pastSearch = document.querySelector("#pastSearch")


var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var apiKey = "a7e2daf70af7df237ffc6f4b3a2f4e20"   

function getWeather(cityName) {
    var weatherLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
    $.ajax({
        url: weatherLink,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        document.getElementById("city-name").innerHTML = response.name
        document.getElementById("temperature").innerHTML = response.main.temp
        document.getElementById("humidity").innerHTML = response.main.humidity + "%"
        document.getElementById("wind-speed").innerHTML = response.wind.speed + "mph"
        var latCoord = response.coord.lat
        var lonCoord = response.coord.lon
        var uviLink = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latCoord + "&lon=" + lonCoord + "&appid=" + apiKey
        $.ajax({
          url: uviLink,
          method: "GET"
        }).then(function(response){
          console.log(response)
        document.getElementById("UV-index").innerHTML = response.value
        })

      });

      var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&units=imperial&appid=" + apiKey
      $.ajax({
        url: fiveDay,
        method: "GET"
      }).then(function(response){
        console.log(response)
      })
      

}




searchBtn.addEventListener("click",function() {
    var searchTerm = cityInput.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})

function renderSearchHistory() {
  pastSearch.innerHTML = "";
  for (var i=0; i<searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
      historyItem.setAttribute("type","text");
      historyItem.setAttribute("readonly",true);
      historyItem.setAttribute("class", "form-control d-block bg-white");
      historyItem.setAttribute("value", searchHistory[i]);
      historyItem.addEventListener("click",function() {
          getWeather(historyItem.value);
      })
      pastSearch.append(historyItem);
  }
}

renderSearchHistory();
if (searchHistory.length > 0) {
  getWeather(searchHistory[searchHistory.length - 1]);
}

}