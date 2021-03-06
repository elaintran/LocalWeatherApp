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
var toggle = document.querySelector(".toggle");
var locationError = document.querySelector(".error");

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

getLocation();

//gets today's date
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
			currentDate.textContent = dateString;
		}
	}
}

var todayAPI = "https://api.openweathermap.org/data/2.5/weather?";
var weekAPI = "https://api.openweathermap.org/data/2.5/forecast?";
var cityName = "q=";
var zipCode = "zip=";
var API = "&APPID=aefa70f2536d1ba79bb2d9f090f4817b";
var imperial = "&units=imperial";
var metric = "&units=metric";

form.addEventListener("submit", submitInput);
var input;

function submitInput(event) {
	event.preventDefault();
	//removes white space from inbetween
	input = locationInput.value.replace(/\s/g, '');
	if (input.length = 0) {
		return false;
	}
	//runSearch(searchLocation);
}

/*function runSearch(searchInput) {
	//if searchInput has 5 numbers
	var checkZip = /\d/g;
	var zipMatch = searchInput.match(checkZip);
	//remove commas
	//var newZipMatch = "";
	if (searchInput.length = 5 && searchInput == newZipMatch) {
		var currentWeatherAPI = todayAPI + zipCode + searchInput + API;
		var weatherAPI = weekAPI + zipCode + searchInput + API; 
	}
}*/

//gets geolocation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	}
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			locationError.textContent = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			locationError.textContent = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			locationError.textContent = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			locationError.textContent = "An unknown error occurred."
			break;
  	}
}

var tempF;
var tempC;
var dailyTempF;
var dailyTempC;
var dailyTemp;
var weeklyTemp;
var temperature = true;
//weeklyTemp[z].innerText.length-1 removes degree sign for math

function changeDegree() {
	if (temperature) {
		fahrenheit.innerHTML = tempC;
		for (var z = 0; z < weeklyTemp.length; z++) {
			weeklyTemp[z].innerHTML = Math.round(5 / 9 * ((weeklyTemp[z].innerText.substring(0, (weeklyTemp[z].innerText.length-1))) - 32)) + "&#176;";
		}
		temperature = false;
	} else {
		fahrenheit.innerHTML = tempF;
		for (var z = 0; z < weeklyTemp.length; z++) {
			weeklyTemp[z].innerHTML = Math.round((weeklyTemp[z].innerText.substring(0, (weeklyTemp[z].innerText.length-1))) * 9 / 5 + 32) + "&#176;";
		}
		temperature = true;
	}
}

function showPosition(position) {
	toggle.style.display = "flex";
	todayDate();
	var positionCoord = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	var currentWeatherAPI = todayAPI + positionCoord + API + imperial;
	var weatherAPI = weekAPI + positionCoord + API + imperial;
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

		tempF = Math.round(todayData.main.temp) + "<sup class='degree'>&#176;</sup>";
		tempC = Math.round(5 / 9 * (todayData.main.temp - 32)) + "<sup class='degree'>&#176;</sup>";

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
				case "Mist":
				case "Atmosphere":
				case "Haze":
					weatherIcon.innerHTML = "<img src='" + atmosphere + "' class='night'>";
					break;
				case "Thunderstorm":
					weatherIcon.innerHTML = "<img src='" + thunderstorm + "' class='night'>";
					break;
				case "Snow":
					weatherIcon.innerHTML = "<img src='" + snow + "' class='night'>";
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
				case "Mist":
				case "Atmosphere":
				case "Haze":
					weatherIcon.innerHTML = "<img src='" + atmosphere + "' class='day'>";
					break;
				case "Thunderstorm":
					weatherIcon.innerHTML = "<img src='" + thunderstorm + "' class='day'>";
					break;
				case "Snow":
					weatherIcon.innerHTML = "<img src='" + snow + "' class='day'>";
					break;
				default:
					weatherIcon.innerHTML = "<img src='' class='day'>";
			}
		}
		//console.log(todayData);
	});
	
	//day by day weather
	$.getJSON(weatherAPI, function(weekData) {
		console.log(weekData);

		var mediaTest = window.matchMedia("(max-width:775px)");
		mediaTest.addListener(resize);
		resize(mediaTest);

		function resize(mediaTest) {
			getWeekDays();
			function getWeekDays() {
				$(".week").html("");
				for (var y = 0; y < weekData.list.length; y++) {
					var checkDate = new Date(weekData.list[y].dt * 1000);
					console.log(checkDate);
					var dateString = checkDate.getHours();
					if (dateString == 13) {
						var dailyTempF = Math.round(weekData.list[y].main.temp);
						var dailyTempC = Math.round(5 / 9 * ((weekData.list[y].main.temp) - 32));
						if (temperature) {
							dailyTemp = dailyTempF;
						} else {
							dailyTemp = dailyTempC;
						}
						var checkWeekWeather = weekData.list[y].weather["0"].main;
						switch (checkWeekWeather) {
							case "Rain":
							case "Drizzle":
								var weekIcon = "<img src='" + dayRain + "' class='weekly'>";
								break;
							case "Clear":
								var weekIcon = "<img src='" + dayClear + "' class='weekly'>";
								break;
							case "Clouds":
								var weekIcon = "<img src='" + dayCloudy + "' class='weekly'>";
								break;
							case "Mist":
							case "Atmosphere":
							case "Haze":
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

						var dayListShort = checkDate.toString().substring(0,3);
						if (mediaTest.matches) {
							var dayName = dayListShort;
						} else {
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
							}
						$(".week").append("<div class='col'><h4 class='day-list'>" + dayName + "</h4>" + weekIcon + "<h4 class='weekly-temp'>" + dailyTemp + "&#176;</h4></div>");
						weeklyTemp = document.querySelectorAll(".weekly-temp");
					}
				}
			}
		}
	});
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