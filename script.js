const myGeolocation = document.querySelector(".geolocation");
const place = document.querySelector(".place");
const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
const time = document.querySelector(".time");
const description = document.querySelector(".description");

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
	const weatherAPI = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	$.getJSON(weatherAPI, function(data) {
		console.log(data);
		celsius.innerHTML = Math.round(data.main.temp) + "&#176;C";
		fahrenheit.innerHTML = Math.round(data.main.temp * 9 / 5 + 32) + "&#176;F";
		place.innerHTML = data.name + ", " + data.sys.country;
		var weatherDescription = data.weather["0"].description;
		var newWeatherDescription = weatherDescription.split(" ").map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.slice(1)).join(" ");
		description.innerHTML = newWeatherDescription;
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
		const newMinutes = "0" + currentTime.getMinutes();
		time.innerHTML = "Today, " + newHours + ":" + newMinutes + " " + ampm;
	}
	else {
		time.innerHTML = "Today, " + newHours + ":" + currentTime.getMinutes() + "" + ampm;
	}
}