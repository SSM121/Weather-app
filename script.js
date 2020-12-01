const ipKey = "9711c8e66f346046c177f533fb24b3c8";
const weatherKey = "41b6d592f9edc42581720bae05f2d6cf";
//var ipInfo;
var currentWeather;
var forcastWeather;
var request;

const app = Vue.createApp({
	data(){
		return{
			ipReady: false,
			ipInfo: null,
		}
	}
});

const vm = app.mount("#app");



function init(){
	fetch("http://api.ipstack.com/check?access_key=" + ipKey)
		.then(response => response.json())
		.then(data => {
			vm.ipInfo = data;
			request = "http://api.openweathermap.org/data/2.5/weather?lat=" + vm.ipInfo.latitude + "&lon=" + vm.ipInfo.longitude + "&appid=" + weatherKey + "&units=imperial";
			vm.ipReady = true;
			return fetch(request);
		})
		.then(response =>response.json())
		.then(json => {
			currentWeather = json;
			request = "http://api.openweathermap.org/data/2.5/forecast?lat=" + vm.ipInfo.latitude + "&lon=" + vm.ipInfo.longitude + "&appid=" + weatherKey + "&units=imperial";
			return fetch(request);
		})
		.then(response => response.json())
		.then(json => {
			forcastWeather = json;
		});
}

init();
