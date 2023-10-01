// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// city search
    function submitQuery() {
        var submitButton = document.getElementById("submitButton");
        var userInput = document.getElementById("selectedCity");
        var forecastCurrentTemp = document.getElementById("currentTemp");
        var forecastCurrentWind = document.getElementById("currentWind");
        var forecastCurrentHum = document.getElementById("currentHum");
        var forecastdayOneTemp = document.getElementById("dayOneTemp");
        var forecastdayOneWind = document.getElementById("dayOneWind");
        var forecastdayOneHum = document.getElementById("dayOneHum");
        var forecastdayTwoTemp = document.getElementById("dayTwoTemp");
        var forecastdayTwoWind = document.getElementById("dayTwoWind");
        var forecastdayTwoHum = document.getElementById("dayTwoHum");
        var forecastdayThreeTemp = document.getElementById("dayThreeTemp");
        var forecastdayThreeWind = document.getElementById("dayThreeWind");
        var forecastdayThreeHum = document.getElementById("dayThreeHum");
        var forecastdayFourTemp = document.getElementById("dayFourTemp");
        var forecastdayFourWind = document.getElementById("dayFourWind");
        var forecastdayFourHum = document.getElementById("dayFourHum");
        var forecastdayFiveTemp = document.getElementById("dayFiveTemp");
        var forecastdayFiveWind = document.getElementById("dayFiveWind");
        var forecastdayFiveHum = document.getElementById("dayFiveHum");
        var forecastCurrentCity = document.getElementById("currentCityValue");
        var dayOneHeader = document.getElementById("dayOne");
        var dayTwoHeader = document.getElementById("dayTwo");
        var dayThreeHeader = document.getElementById("dayThree");
        var dayFourHeader = document.getElementById("dayFour");
        var dayFiveHeader = document.getElementById("dayFive");
        var userHistory = document.getElementById("userHistory");
        
        var userCityValue = ("");
        var currentCityTemp = ("");
        var currentCityHumidity = ("");
        var currentCityWind = ("");
        var dayOneTemp = ("");
        var dayOneWind = ("");
        var dayOneHum = ("");
        var dayTwoTemp = ("");
        var dayTwoWind = ("");
        var dayTwoHum = ("");
        var dayThreeTemp = ("");
        var dayThreeWind = ("");
        var dayThreeHum = ("");
        var dayFourTemp = ("");
        var dayFourWind = ("");
        var dayFourHum = ("");
        var dayFiveTemp = ("");
        var dayFiveWind = ("");
        var dayFiveHum = ("");
        var currentCityName = ("");
        var allCities = [];
        var currentDate = dayjs().format('dddd MMMM DD, YYYY');
        var cityCounter = 0;
        
        
    
        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            console.log(submitButton);
            console.log(userInput);
            console.log(userCityValue);
            console.log(currentDate);
            var currentDatePlusone = dayjs(currentDate).add(1, 'day').format('MMMM DD, YYYY');
            var currentDatePlustwo = dayjs(currentDate).add(2, 'day').format('MMMM DD, YYYY');
            var currentDatePlusthree = dayjs(currentDate).add(3, 'day').format('MMMM DD, YYYY');
            var currentDatePlusfour = dayjs(currentDate).add(4, 'day').format('MMMM DD, YYYY');
            var currentDatePlusfive = dayjs(currentDate).add(5, 'day').format('MMMM DD, YYYY');
            console.log(currentDatePlusone);
            
            userCityValue = userInput.value;
            console.log(userCityValue);
            
                // Stores the current city in localStorage as an array
                if (allCities != null) {
                    allCities.push(userCityValue);
                    console.log(allCities);
                    localStorage.setItem("City", allCities);;
                } else {
                    allCities = localStorage.getItem(allCities);
                    allCities.push(userCityValue);
                    console.log(allCities);
                    localStorage.setItem("City", allCities);
                }
                console.log(allCities.length);
                
                if (allCities.length === 0 ) {
                    return;
                } else {
                    userHistory.replaceChildren();
                    for (i=0; i<allCities.length; i++) {
                    var lastEntry = document.createElement("BUTTON");
                    var breakLine = document.createElement("li");
                    lastEntry.textContent = (allCities[i]);
                    userHistory.appendChild(breakLine);
                    breakLine.appendChild(lastEntry);
                }
                }
                

                fetch('https://api.openweathermap.org/data/2.5/forecast?q='+userCityValue+',us&APPID=&daily&units=imperial')
                .then(function (response) {
                    console.log(response);
                    if (response.ok != true) {
                        return;
                    } else {
                    return response.json();
                    }
                })
                .then(function (data) {
                    
                    currentCityName = data.city.name;
                    console.log(data);
                    console.log(data.list[0].weather[0].description);
                    // Current Day
                    if (data.list[0].weather[0].main == "Clear") {
                        forecastCurrentCity.textContent = (currentCityName + " " + currentDate + " 🌞");
                    } else if (data.list[0].weather[0].main == "Clouds") {
                        forecastCurrentCity.textContent = (currentCityName + " " + currentDate + " 🌤️");
                    } else if (data.list[0].weather[0].main == "Rain") {
                        forecastCurrentCity.textContent = (currentCityName + " " + currentDate + " 🌧️");
                    } else {
                        forecastCurrentCity.textContent = (currentCityName + " " + currentDate);   
                    }
                    currentCityTemp = data.list[0].main.temp;
                    console.log(currentCityTemp + " F");
                    forecastCurrentTemp.textContent = ("Current Temperature is "+ currentCityTemp + " degrees F"); 
                    currentCityWind = data.list[0].wind.speed;
                    console.log(currentCityWind + " mph");
                    forecastCurrentWind.textContent = ("Current Wind Speed is "+ currentCityWind + " mph");
                    currentCityHumidity = data.list[0].main.humidity;
                    console.log(currentCityHumidity + " %");
                    forecastCurrentHum.textContent = ("Current Humidity is "+ currentCityHumidity + " %");
                    
                    // Day + 1
                    if (data.list[5].weather[0].main == "Clear") {
                        dayOneHeader.textContent = (currentDatePlusone + " 🌞");
                    } else if (data.list[5].weather[0].main == "Clouds") {
                        dayOneHeader.textContent = (currentDatePlusone + " 🌤️");
                    } else if (data.list[5].weather[0].main == "Rain") {
                        dayOneHeader.textContent = (currentDatePlusone + " 🌧️");
                    } else {
                        dayOneHeader.textContent = (currentDatePlusone);
                    }
                    dayOneTemp = data.list[5].main.temp;
                    forecastdayOneTemp.textContent = ("Temperature will be "+ dayOneTemp + " degrees F");
                    dayOneWind = data.list[5].wind.speed;
                    forecastdayOneWind.textContent = ("Wind Speed will be "+ dayOneWind + " mph");
                    dayOneHum = data.list[5].main.humidity;
                    forecastdayOneHum.textContent = ("Humidity will be "+ dayOneHum + " %");
                    
                    // Day + 2
                    if (data.list[13].weather[0].main == "Clear") {
                        dayTwoHeader.textContent = (currentDatePlustwo + " 🌞");
                    } else if (data.list[13].weather[0].main == "Clouds") {
                        dayTwoHeader.textContent = (currentDatePlustwo + " 🌤️");
                    } else if (data.list[13].weather[0].main == "Rain") {
                        dayTwoHeader.textContent = (currentDatePlustwo + " 🌧️");
                    } else {
                        dayTwoHeader.textContent = (currentDatePlustwo);
                    }
                    dayTwoTemp = data.list[13].main.temp;
                    forecastdayTwoTemp.textContent = ("Temperature will be "+ dayTwoTemp + " degrees F");
                    dayTwoWind = data.list[13].wind.speed;
                    forecastdayTwoWind.textContent = ("Wind Speed will be "+ dayTwoWind + " mph");
                    dayTwoHum = data.list[13].main.humidity;
                    forecastdayTwoHum.textContent = ("Humidity will be "+ dayTwoHum + " %");
                    
                    // Day + 3
                    if (data.list[21].weather[0].main == "Clear") {
                        dayThreeHeader.textContent = (currentDatePlusthree + " 🌞");
                    } else if (data.list[21].weather[0].main == "Clouds") {
                        dayThreeHeader.textContent = (currentDatePlusthree + " 🌤️");
                    } else if (data.list[21].weather[0].main == "Rain") {
                        dayThreeHeader.textContent = (currentDatePlusthree + " 🌧️");
                    }  else {
                        dayThreeHeader.textContent = (currentDatePlusthree);
                    }
                    dayThreeTemp = data.list[21].main.temp;
                    forecastdayThreeTemp.textContent = ("Temperature will be "+ dayThreeTemp + " degrees F");
                    dayThreeWind = data.list[21].wind.speed;
                    forecastdayThreeWind.textContent = ("Wind Speed will be "+ dayThreeWind + " mph");
                    dayThreeHum = data.list[21].main.humidity;
                    forecastdayThreeHum.textContent = ("Humidity will be "+ dayThreeHum + " %");
                    
                    // Day + 4
                    if (data.list[29].weather[0].main == "Clear") {
                        dayFourHeader.textContent = (currentDatePlusfour + " 🌞");
                    } else if (data.list[29].weather[0].main == "Clouds") {
                        dayFourHeader.textContent = (currentDatePlusfour + " 🌤️");
                    } else if (data.list[29].weather[0].main == "Rain") {
                        dayFourHeader.textContent = (currentDatePlusfour + " 🌧️");
                    }  else {
                        dayFourHeader.textContent = (currentDatePlusfour);
                    }
                    dayFourTemp = data.list[29].main.temp;
                    forecastdayFourTemp.textContent = ("Temperature will be "+ dayFourTemp + " degrees F");
                    dayFourWind = data.list[29].wind.speed;
                    forecastdayFourWind.textContent = ("Wind Speed will be "+ dayFourWind + " mph");
                    dayFourHum = data.list[29].main.humidity;
                    forecastdayFourHum.textContent = ("Humidity will be "+ dayFourHum + " %");
                    
                    // Day + 5
                    if (data.list[37].weather[0].main == "Clear") {
                        dayFiveHeader.textContent = (currentDatePlusfive + " 🌞");
                    } else if (data.list[37].weather[0].main == "Clouds") {
                        dayFiveHeader.textContent = (currentDatePlusfive + " 🌤️");
                    } else if (data.list[37].weather[0].main == "Rain") {
                        dayFiveHeader.textContent = (currentDatePlusfive + " 🌧️");
                    }  else {
                        dayFiveHeader.textContent = (currentDatePlusfive);
                    }
                    dayFiveTemp = data.list[37].main.temp;
                    forecastdayFiveTemp.textContent = ("Temperature will be "+ dayFiveTemp + " degrees F");
                    dayFiveWind = data.list[37].wind.speed;
                    forecastdayFiveWind.textContent = ("Wind Speed will be "+ dayFiveWind + " mph");
                    dayFiveHum = data.list[37].main.humidity;
                    forecastdayFiveHum.textContent = ("Humidity will be "+ dayFiveHum + " %");
                    
                });
        });
    }
submitQuery();

 // add form input to #selectedCity
// when i click the submit button a valid city must be present
// when i click the submit button if a valid city is present it returns and places the city in the saved ul as a button
// saved city can recall the data displayed in the forecast  and 5 day forecast as a saved search

// search string must parse the weather api 
// search string must return obj literals of the weather api
// search string must check for a valid city
// search string could auto fill city????

// valid search returns the name of the city and the date to replace Forcast in #currentWeather
// valid search returns values for temperature wind and humidity
// valid search returns 5 day forecast broken out into 5 card elements with the same three elements see card 1 for a shell