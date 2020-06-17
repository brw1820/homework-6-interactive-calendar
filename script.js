// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e9688c472c7e00d4dcc313124c3c2a7
$(document).ready(function () {
  console.log("hello world");

  $("#city-location").on("click", function () {
    // event.preventDefault();
    var cityName = $("#city-search").val();
    // Create "li" element and append it to "ul" list
   var button= $('<button>');
   button.text(cityName);
   $(".cities-list").append(button);

    var APIKey = "4e9688c472c7e00d4dcc313124c3c2a7";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey;
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast/id?q=" +
      cityName +
      "&appid=27b2cedd2dfb2b4e4198640c8d09052b";

    // console.log(forecastURL);
    // var cityNameArray = [];
    // localStorage.setItem(cityName, JSON.stringify(cityName));
    // console.log(localStorage.setItem(cityName, JSON.stringify(cityNameArray)));
    // response.coord.lat
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        // Log the queryURL
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lat);
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F): " + tempF.toFixed(2) + " °");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF + " Degrees");
        var uvURL = "";
        $.ajax({
          url:
            "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=4e9688c472c7e00d4dcc313124c3c2a7&lat=" +
            lat +
            "&lon=" +
            lon +
            "&cnt=1",
        });
        $("uv-index").text("UV Index: " + response.value);
      });

    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (response) {
      fAPI = response;
      
      $(".city-forecast").html(
        "<h1>" + response.name + " Weather Details</h1>"
      );
      $(".wind-forecast").text("Wind Speed: " + response.wind.speed);
      $(".humidity-forecast").text("Humidity: " + response.main.humidity);

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
    });
  });
});
