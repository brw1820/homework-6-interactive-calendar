// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e9688c472c7e00d4dcc313124c3c2a7
$(document).ready(function () {
  console.log("hello world");
  $(".time").text(moment().format('MMMM Do YYYY'));

  var cityNameArray = [];
  var localCity = localStorage.getItem("cityNameArray")
  
  var cityButton = $("<button>");
  cityButton.text(cityNameArray);
  $("#cities-list").append(cityButton);


  $("#cities-list").on("click", function()  {
    
  })

  $("#city-location").on("click", function () {
    $(".forecast-result").empty();
    
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
      "&units=imperial&appid=" + APIKey;

    
  
  cityNameArray.push(cityName);
  localStorage.setItem("cityNameArray", JSON.stringify(cityNameArray));
  
    
  //   todoForm.addEventListener("submit", function(event) {
  //     event.preventDefault();
  //     if (todoText === "") {
  //       return;
  //     }
    
  //     // Add new todoText to todos array, clear the input
  //     todos.push(todoText);
  //     todoInput.value = "";
    
  //     // Store updated todos in localStorage, re-render the list
  //     render();
  //   });
    
    
  //     var todoText = todoInput.value.trim();

    // console.log(localStorage.getItem("cityName"));
    
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
        let weatherPic = response.weather[0].icon;
        $(".weather-icon").append(`<img src= http://openweathermap.org/img/wn/${weatherPic}@2x.png>`);
        console.log(weatherPic);
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
        }).then(function (response2) {
        $(".uv-index").text("UV Index: " + response2[0].value);
        if (response2[0].value < 3){
          $(".uv-index").addClass("green");
        } else if (response2[0].value > 10){
          $(".uv-index").addClass("red");
      } else {
        $(".uv-index").addClass("yellow")};
      
      });
      });
  
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (response) {
      $(".city-forecast").attr("class", "");
      let forecastWeather = $(".forecast-result");
      console.log(response);
     
      for (i = 1; i < 6; i++) {
        let forecastData = $("<div class ='col-sm rounded-lg forecast-columns'>");
        let forecastDay = moment(moment().add('days', i)).format("MM/DD/YYYY");
        forecastData.append("</h6>" + forecastDay + "</h6>");
        let forecastPic = response.list[i].weather[0].icon;
        `<img src= http://openweathermap.org/img/wn/${forecastPic}@2x.png>`
        forecastData.append("<p> " + `<img src= http://openweathermap.org/img/wn/${forecastPic}@2x.png>` + "</p>");
        let forecastTemperature = response.list[i].main.temp;
        forecastData.append("<p>Temperature: " + forecastTemperature + "°</p>")
        let forecastHumidity = response.list[i].main.humidity;
        forecastData.append("<p>Humidity: " + forecastHumidity + "%</p>");
        forecastWeather.append(forecastData);
        console.log(forecastURL);
      };
    });
  });
});

      //  console.log(forecastData);
        // var forecastDay = moment(moment().add("day", i)).format("MM/DD/YYYY");
        // forecastData.append("<h5" + forecastDay + "<h5>");
        // var forecastData1 = $('.card-city1');
        // var forecastTemperature1 = response.list[1].main.temp; 
        // forecastData1.append("Temperature (F°): " + forecastTemperature1 + ' ');
        // var forecastData2 = $('.card-city2');
        // var forecastTemperature2 = response.list[2].main.temp; 
        // forecastData2.append("Temperature (F°): " + forecastTemperature2 + ' ');
        // var forecastData3 = $('.card-city3');
        // var forecastTemperature3 = response.list[3].main.temp; 
        // forecastData3.append("Temperature (F°): " + forecastTemperature3 + ' ');
        // var forecastData4 = $('.card-city4');
        // var forecastTemperature4 = response.list[4].main.temp; 
        // forecastData4.append("Temperature (F°): " + forecastTemperature4 + ' ');
        // var forecastData5 = $('.card-city5');
        // var forecastTemperature5 = response.list[5].main.temp; 
        // forecastData5.append("Temperature (F°): " +  forecastTemperature5) + ' ';

        // var forecastHumidity1 = $('.card-city1');
        // var forecastHumid1 = response.list[1].main.humidity;
        // forecastHumidity1.append("Humidity: " + forecastHumid1 + "%")
        // var forecastHumidity2 = $('.card-city2');
        // var forecastHumid2 = response.list[2].main.humidity;
        // forecastHumidity2.append("Humidity: " + forecastHumid2 + "%")
        // var forecastHumidity3 = $('.card-city3');
        // var forecastHumid3 = response.list[3].main.humidity;
        // forecastHumidity3.append("Humidity: " + forecastHumid3 + "%")
        // var forecastHumidity4 = $('.card-city4');
        // var forecastHumid4 = response.list[4].main.humidity;
        // forecastHumidity4.append("Humidity: " + forecastHumid4 + "%")
        // var forecastHumidity5 = $('.card-city5');
        // var forecastHumid5 = response.list[5].main.humidity;
        // forecastHumidity5.append("Humidity: " + forecastHumid5 + "%")
     

        // forecastDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        // console.log(forecastDate);
        // $("#card1").append(forecastdate)

        // forecastData1.append(forecastHumidity);
        // console.log(forecastHumidity);

        
      // $(".city-forecast").html(
      //   "<h1>" + response.name + " Weather Details</h1>"
      // );
      // $(".wind-forecast").text("Wind Speed: " + response.wind.speed);
      // $(".humidity-forecast").text("Humidity: " + response.main.humidity);
      // $(".container-fluid").empty();
    

