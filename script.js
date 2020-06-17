// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e9688c472c7e00d4dcc313124c3c2a7
$(document).ready(function () {
  console.log("hello world");
  // $('.time').text(moment().format('MMMM Do YYYY'));
  $("#city-location").on("click", function () {
    // event.preventDefault();
    var cityName = $("#city-search").val();
    // Create "li" element and append it to "ul" list
    var button = $("<button>");
    button.text(cityName);
    $(".cities-list").append(button);

    var APIKey = "4e9688c472c7e00d4dcc313124c3c2a7";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey;
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=27b2cedd2dfb2b4e4198640c8d09052b";

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
        // var currentDate = moment().format('MMMM do YYYY');
        // console.log(currentDate);
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
console.log(queryURL);
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
      // $(".city-forecast").attr("class", "");
     
      // for (i = 1; i < 6; i++) {
        
      //  console.log(forecastData);
        // var forecastDay = moment(moment().add("day", i)).format("MM/DD/YYYY");
        // forecastData.append("<h5" + forecastDay + "<h5>");
        var forecastData1 = $('.card-city1');
        var forecastTemperature1 = response.list[1].main.temp; 
        forecastData1.append("Temperature (F°): " + forecastTemperature1 + ' ');
        var forecastData2 = $('.card-city2');
        var forecastTemperature2 = response.list[2].main.temp; 
        forecastData2.append("Temperature (F°): " + forecastTemperature2 + ' ');
        var forecastData3 = $('.card-city3');
        var forecastTemperature3 = response.list[3].main.temp; 
        forecastData3.append("Temperature (F°): " + forecastTemperature3 + ' ');
        var forecastData4 = $('.card-city4');
        var forecastTemperature4 = response.list[4].main.temp; 
        forecastData4.append("Temperature (F°): " + forecastTemperature4 + ' ');
        var forecastData5 = $('.card-city5');
        var forecastTemperature5 = response.list[5].main.temp; 
        forecastData5.append("Temperature (F°): " +  forecastTemperature5) + ' ';

        var forecastHumidity1 = $('.card-city1');
        var forecastHumid1 = response.list[1].main.humidity;
        forecastHumidity1.append("Humidity: " + forecastHumid1 + "%")
        var forecastHumidity2 = $('.card-city2');
        var forecastHumid2 = response.list[2].main.humidity;
        forecastHumidity2.append("Humidity: " + forecastHumid2 + "%")
        var forecastHumidity3 = $('.card-city3');
        var forecastHumid3 = response.list[3].main.humidity;
        forecastHumidity3.append("Humidity: " + forecastHumid3 + "%")
        var forecastHumidity4 = $('.card-city4');
        var forecastHumid4 = response.list[4].main.humidity;
        forecastHumidity4.append("Humidity: " + forecastHumid4 + "%")
        var forecastHumidity5 = $('.card-city5');
        var forecastHumid5 = response.list[5].main.humidity;
        forecastHumidity5.append("Humidity: " + forecastHumid5 + "%")
     

        forecastDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(forecastDate);
        // $("#card1").append(forecastdate)

        // forecastData1.append(forecastHumidity);
        // console.log(forecastHumidity);

      });
      // $(".city-forecast").html(
      //   "<h1>" + response.name + " Weather Details</h1>"
      // );
      // $(".wind-forecast").text("Wind Speed: " + response.wind.speed);
      // $(".humidity-forecast").text("Humidity: " + response.main.humidity);

    
    });
  });
