const myGeolocation = document.querySelector(".geolocation");
const place = document.querySelector(".place");
const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");

window.onload = function() {
	getLocation();
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
		fahrenheit.innerHTML = Math.round(data.main.temp) * 9 / 5 + 32 + "&#176;F";
		place.innerHTML = data.name + ", " + data.sys.country;
	});
}