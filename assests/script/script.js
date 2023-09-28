// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

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