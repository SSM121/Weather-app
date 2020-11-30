const ipKey = "9711c8e66f346046c177f533fb24b3c8";
const weatherKey = "41b6d592f9edc42581720bae05f2d6cf";
var ipInfo;
var currentWeather;
var request;

function init(){
	fetch("http://api.ipstack.com/check?access_key=" + ipKey)
		.then(response => response.json())
		.then(data => {
			ipInfo = data;
			request = "http://api.openweathermap.org/data/2.5/weather?lat=" + ipInfo.latitude + "&lon=" + ipInfo.longitude + "&appid=" + weatherKey;
			return fetch(request);
		})
		.then(response =>response.json())
		.then(json => {
			currentWeather = json;
		});
}
