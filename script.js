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

window.onload = function() {
	getLocation();
	//getTime();
	todayDate();
}

//gets geolocation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		myGeolocation.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=aefa70f2536d1ba79bb2d9f090f4817b";
	$.getJSON(weatherAPI, function(data) {
		console.log(data);
		//degree round to whole number
		//celsius.innerHTML = Math.round(data.main.temp) + "&#176;C";
		//convert Kelvins to Fahrenheit
		var fahrenheitNumber = Math.round(((data.list["0"].main.temp) - 273.15) * 9 / 5 + 32);
		fahrenheit.innerHTML = fahrenheitNumber + "<sup class='degree'>&#176;</sup>";
		place.innerHTML = data.city.name + ", " + data.city.country;
		var weatherDescription = data.list["0"].weather["0"].description;
		//capitalize first letter of every word in description
		var newWeatherDescription = weatherDescription.split(" ").map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.slice(1)).join(" ");
		description.innerHTML = newWeatherDescription;
		humidity.innerHTML = "Humidity: " + data.list["0"].main.humidity + "%";
		//need to convert
		var windNumber = Math.round(data.list["0"].wind.speed + 2.237);
		wind.innerHTML = "Wind: " + windNumber + " mph";
		
		getWeekDays();

		//console.log(data.list.length);
		//console.log(data.list["0"].dt_txt);
		//console.log(data.list["0"].dt_txt.substring(10));
		//console.log(data.list["0"])
		function getWeekDays() {
			$(".row").html("");
			for (var y = 0; y < data.list.length; y++) {
				if (data.list[y].dt_txt.substring(11) == "12:00:00") {
					var dailyTemp = Math.round(((data.list[y].main.temp) - 273.15) * 9 / 5 + 32);
					$(".row").append("<div class='col'><h3 class='day'>" + dailyTemp + "&#176;</h3></div>");
					console.log(data.list[y].main.temp);
				}
			}
		}
	});
}

var currentTime = new Date();

var monthList = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"];
var dayList = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

function todayDate() {
	for (var x = 0; x < dayList.length; x++) {
		if (currentTime.getDate() == x) {
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