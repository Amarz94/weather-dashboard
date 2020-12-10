window.onload = function() {

var searchBtn = document.querySelector("#searchBtn")
var cityInput = document.querySelector("#cityInput")

var apiKey = "a7e2daf70af7df237ffc6f4b3a2f4e20"   

function getWeather(cityName) {
    var weatherLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + Apikey
    $.ajax({
        url: weatherLink,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });

    
 
}
searchBtn.addEventListener("click",function() {
    var searchTerm = cityInput.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})


}