window.onload = function() {

var searchBtn = document.querySelector("#searchBtn")
var cityInput = document.querySelector("#cityInput")
var pastSearch = document.querySelector("#pastSearch")

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var apiKey = "a7e2daf70af7df237ffc6f4b3a2f4e20"   

function getWeather(cityName) {
    var weatherLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
    $.ajax({
        url: weatherLink,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        document.getElementById("city-name").innerHTML = response.name + "   " + date
        document.getElementById("temperature").innerHTML = "Temperauture: " + response.main.temp
        document.getElementById("humidity").innerHTML = "Humidity: " + response.main.humidity + "%"
        document.getElementById("wind-speed").innerHTML ="Wind speed: " + response.wind.speed + "mph"
        var latCoord = response.coord.lat
        var lonCoord = response.coord.lon
        var uviLink = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latCoord + "&lon=" + lonCoord + "&appid=" + apiKey
        $.ajax({
          url: uviLink,
          method: "GET"
        }).then(function(response){
          console.log(response)
        document.getElementById("UV-index").innerHTML = "UV-index: "+ response.value
          if(response.value <= 4){
            document.getElementById("UV-index").setAttribute("style", "color: green")
          } else if(response.value <= 7){
            document.getElementById("UV-index").setAttribute("style", "color: yellow")
          } else{
            document.getElementById("UV-index").setAttribute("style", "color: red")
          }
        })

      });

      var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&units=imperial&appid=" + apiKey
      $.ajax({
        url: fiveDay,
        method: "GET"
      }).then(function(response){
        var forecastDiv = document.querySelectorAll(".forecast")
        var daySelector = -4  
        console.log(response)

        for(var i = 0; i < forecastDiv.length; i++) {
          var forecastTemp = document.createElement("p")
          var forecastHum = document.createElement("p")
          console.log(i)
          daySelector+= 8;
          forecastDiv[i].innerHTML = "";
          forecastTemp.innerHTML = "Temp: " + response.list[daySelector].main.temp + "&#176f"
          forecastDiv[i].append(forecastTemp)

          forecastHum.innerHTML = "Humidity: " + response.list[daySelector].main.humidity + "%"
          forecastDiv[i].append(forecastHum)
          

        }
      })
      

}

searchBtn.addEventListener("click",function() {
    var searchTerm = cityInput.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderHistory();
    
})

document.getElementById("clearBtn").addEventListener("click",function() {
  searchHistory = [];
  renderHistory();
})

function renderHistory() {
  pastSearch.innerHTML = "";
  for (var i=0; i<searchHistory.length; i++) {
      var historyItem = document.createElement("input");
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

renderHistory();
if (searchHistory.length > 0) {
  getWeather(searchHistory[searchHistory.length - 1]);
}

}