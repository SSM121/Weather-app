const ipKey = "9711c8e66f346046c177f533fb24b3c8";
const weatherKey = "41b6d592f9edc42581720bae05f2d6cf";

var request;

const app = Vue.createApp({
	data(){
		return{
			ipReady: false,
			ipInfo: null,
			currWeatherReady: false,
			currWeather: null,
			date: null,
			forcastWeather: null,
			forcastWeatherReady: false,
			unlikely: 0,
			neutral: 40,
			likely: 0,
			forcasts: [],
		}
	},
	methods:{
		activate(id, event){
			var f = this.forcasts[id];
			if(f.isNeutral){
				f.isNeutral = false;
				this.neutral--;
				f.isLikely = true;
				this.likely++;
			} else if(f.isLikely){
				f.isLikely = false;
				this.likely--;
				f.isUnlikely = true;
				this.unlikely++;
			} else if(f.isUnlikely){
				f.isUnlikely = false;
				this.unlikely--;
				f.isNeutral = true;
				this.neutral++
			}
		}
	}
});

const vm = app.mount("#app");

function initForcasts(){
	var loc = vm.forcastWeather.list
	for(i = 0; i < 40; i++){
		var d = new Date(loc[i].dt_txt);
		vm.forcasts[i] = {
			id: i,
			date: (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString('en-US'),
			temp: loc[i].main.temp,
			temp_max: loc[i].main.temp_max,
			temp_min: loc[i].main.temp_min,
			sky: loc[i].weather[0].description,
			humidity: loc[i].main.humidity,
			pressure: loc[i].main.pressure,
			//0 = neutral, 1 = likely, -1 = unlikely
			isNeutral: true,
			isLikely: false,
			isUnlikely: false,
		}
	}
}

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
			vm.currWeather = json;
			var d = new Date();
			vm.date = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString('en-US');
			vm.currWeatherReady = true;
			request = "http://api.openweathermap.org/data/2.5/forecast?lat=" + vm.ipInfo.latitude + "&lon=" + vm.ipInfo.longitude + "&appid=" + weatherKey + "&units=imperial";
			return fetch(request);
		})
		.then(response => response.json())
		.then(json => {
			vm.forcastWeather = json;
			initForcasts();
			vm.forcastWeatherReady = true;
		});
}

init();
