const myGeolocation = document.querySelector(".geolocation");

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
	});
}