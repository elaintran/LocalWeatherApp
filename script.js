var myGeolocation = document.querySelector(".geolocation");
var place = document.querySelector(".place");
var celsius = document.querySelector(".celsius");
var fahrenheit = document.querySelector(".fahrenheit");
//var time = document.querySelector(".time");
var description = document.querySelector(".description");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var currentDate = document.querySelector(".current-date");
var week = document.querySelector(".week");
var weatherIcon = document.querySelector(".weather-icon");
var form = document.querySelector(".search");
var locationInput = document.querySelector(".location-input");

//weather icons
var nightRain = "images/night-rain.png";
var dayRain = "images/day-rain.png";
var dayClear = "images/day-clear.png";
var nightClear = "images/night-clear.png";
var dayCloudy = "images/day-cloudy.png";
var nightCloudy = "images/night-cloudy.png";
var atmosphere = "images/atmosphere.png";
var thunderstorm = "images/thunderstorm.png";
var snow = "images/snow.png";

window.onload = function() {
	getLocation();
}

/*form.addEventListener("submit", submitInput);

function submitInput(event) {
	event.preventDefault;
	var input = locationInput.value;
	var searchLocation = input.trim();
	if (searchLocation.length = 0) {
		return false;
	}
}

function runSearch(searchInput) {
	//if searchInput has numbers - check for numbers
	if (searchInput ) {
		var inputAPI = todayAPI +  
	}
}*/

//gets geolocation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
		todayDate();
	}
	else {
		myGeolocation.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	var todayAPI = "https://api.openweathermap.org/data/2.5/weather?";
	var weekAPI = "https://api.openweathermap.org/data/2.5/forecast?";
	var cityName = "q=";
	var zipCode = "zip=";
	var positionCoord = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	var API = "&APPID=aefa70f2536d1ba79bb2d9f090f4817b&units=imperial";
	var currentWeatherAPI = todayAPI + positionCoord + API;
	var weatherAPI = weekAPI + positionCoord + API;
	//today's weather
	$.getJSON(currentWeatherAPI, function(todayData) {
		//general info
		place.innerHTML = todayData.name + ", " + todayData.sys.country;
		var weatherDescription = todayData.weather["0"].description;
		//capitalize first letter of every word in description
		var newWeatherDescription = weatherDescription.split(" ").map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.slice(1)).join(" ");
		description.innerHTML = newWeatherDescription;
		fahrenheit.innerHTML = Math.round(todayData.main.temp) + "<sup class='degree'>&#176;</sup>";
		//fahrenheit.innerHTML = Math.round(todayData.main.temp * 9 / 5 + 32) + "<sup class='degree'>&#176;</sup>";
		humidity.innerHTML = "Humidity: " + todayData.main.humidity + "%";
		var windNumber = Math.round(todayData.wind.speed);
		wind.innerHTML = "Wind: " + windNumber + " mph";
		
		//night weather
		var todayWeather = todayData.weather["0"].main;
		if (currentTime.getHours() >= 18 || currentTime.getHours() < 6) {
			switch (todayWeather) {
				case "Rain":
				case "Drizzle":
					weatherIcon.innerHTML = "<img src='" + nightRain + "' class='night'>";
					break;
				case "Clear":
					weatherIcon.innerHTML = "<img src='" + nightClear + "' class='night'>";
					break;
				case "Clouds":
					weatherIcon.innerHTML = "<img src='" + nightCloudy + "' class='night'>";
					break;
				default:
					weatherIcon.innerHTML = "<img src='' class='night'>";
			}
		//day weather
		} else if (currentTime.getHours() < 18 && currentTime.getHours() >= 6) {
			switch (todayWeather) {
				case "Rain":
				case "Drizzle":
					weatherIcon.innerHTML = "<img src='" + dayRain + "' class='day'>";
					break;
				case "Clear":
					weatherIcon.innerHTML = "<img src='" + dayClear + "' class='day'>";
					break;
				case "Clouds":
					weatherIcon.innerHTML = "<img src='" + dayCloudy + "' class='day'>";
					break;
				default:
					weatherIcon.innerHTML = "<img src='' class='day'>";
			}
		}
		//both weather
		else {
			switch(todayWeather) {
				case "Atmosphere":
					weatherIcon.innerHTML = "<img src='" + atmosphere + "' class='both'>";
					break;
				case "Thunderstorm":
					weatherIcon.innerHTML = "<img src='" + thunderstorm + "' class='both'>";
					break;
				case "Snow":
					weatherIcon.innerHTML = "<img src='" + snow + "' class='both'>";
					break;
				default:
					weatherIcon.innerHTML = "<img src='' class='both'>";
			}
		}
		console.log(todayData);
	});
	
	//day by day weather
	$.getJSON(weatherAPI, function(weekData) {
		console.log(weekData);
		getWeekDays();

		function getWeekDays() {
			//weekDay();
			$(".week").html("");
			for (var y = 0; y < weekData.list.length; y++) {
				var checkDate = new Date(weekData.list[y].dt * 1000);
				var dateString = checkDate.toString();
				//var timeString = dateString.substring(16, 18);
				//console.log(test);
				if (dateString.substring(16, 18) == 12) {
					var dayListShort = dateString.substring(0,3);
					var checkWeekWeather = weekData.list[y].weather["0"].main;
					switch (checkWeekWeather) {
						case "Rain":
							var weekIcon = "<img src='" + dayRain + "' class='weekly'>";
							break;
						case "Clear":
							var weekIcon = "<img src='" + dayClear + "' class='weekly'>";
							break;
						case "Clouds":
							var weekIcon = "<img src='" + dayCloudy + "' class='weekly'>";
							break;
						case "Atmosphere":
							var weekIcon = "<img src='" + atmosphere + "' class='weekly'>";
							break;
						case "Thunderstorm":
							var weekIcon = "<img src='" + thunderstorm + "' class='weekly'>";
							break;
						case "Snow":
							var weekIcon = "<img src='" + snow + "' class='weekly'>";
							break;
						default:
							var weekIcon = "<img src='' class='weekly'>";
					}
					switch (dayListShort) {
						case "Sun":
							var dayName = "Sunday";
							break;
						case "Mon":
							var dayName = "Monday";
							break;
						case "Tue":
							var dayName = "Tuesday";
							break;
						case "Wed":
							var dayName = "Wednesday";
							break;
						case "Thu":
							var dayName = "Thursday";
							break;
						case "Fri":
							var dayName = "Friday";
							break;
						case "Sat":
							var dayName = "Saturday";
							break;
						default:
							var dayName = "";
					}
					var dailyTempF = Math.round(weekData.list[y].main.temp);
					$(".week").append("<div class='col'><h4 class='day-list'>" + dayName + "</h4>" + weekIcon + "<h4 class='weekly-temp'>" + dailyTempF + "&#176;</h4></div>");
				}
			}
		}
	});
}

var currentTime = new Date();

var monthList = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"];
var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function todayDate() {
	for (var x = 0; x < dayList.length; x++) {
		if (currentTime.getDay() == x) {
			var dateString = dayList[x];
		}
	}
	for (var i = 0; i < monthList.length; i++) {
		if (currentTime.getMonth() == i) {
			dateString += ", " + monthList[i] + " " + currentTime.getDate() + ", " + currentTime.getFullYear();
			currentDate.innerHTML = dateString;
		}
	}
}

//gets current time
/*function getTime() {
	if (currentTime.getHours() > 12) {
		var newHours = currentTime.getHours() - 12;
	}
	else {
		var newHours = currentTime.getHours();
	}
	if (currentTime.getHours() >= 12) {
		var ampm = " PM";
	}
	else {
		var ampm = " AM";
	}
	if (currentTime.getMinutes() < 10) {
		var newMinutes = "0" + currentTime.getMinutes();
		time.innerHTML = newHours + ":" + newMinutes + " " + ampm;
	}
	else {
		time.innerHTML = newHours + ":" + currentTime.getMinutes() + "" + ampm;
	}
}*/