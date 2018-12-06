var myGeolocation = document.querySelector(".geolocation");
var place = document.querySelector(".place");
var celsius = document.querySelector(".celsius");
var fahrenheit = document.querySelector(".fahrenheit");
var time = document.querySelector(".time");
var description = document.querySelector(".description");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");

window.onload = function() {
	getLocation();
	getTime();
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
		/*humidity.innerHTML = "Humidity: " + data.list["0"].main.humidity + "%";
		//need to convert
		var windNumber = Math.round(data.list["0"].wind.speed + 2.237);
		wind.innerHTML = "Wind: " + windNumber + " mph";*/
	});
}

const currentTime = new Date();

function getTime() {
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
		time.innerHTML = "Today, " + newHours + ":" + newMinutes + " " + ampm;
	}
	else {
		time.innerHTML = "Today, " + newHours + ":" + currentTime.getMinutes() + "" + ampm;
	}
}