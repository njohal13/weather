let weather = {
    "apiKey": "d2952fccb2cef24f444005a3e8eaf212",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&units=metric&appid=" 
            + this.apiKey //use this. since apiKey is already in the object of weather
            )
        .then((res) => res.json())
        .then((data)=>this.displayWeather(data))
    },
    //Locate data from json, save it to variables, then display it
    displayWeather: function(data){
        const {name} = data; //take name value out of data and store it in variable name
        const {icon, description} = data.weather[0]//take icon & description out of weather array
        const {temp, humidity} = data.main // take temp & humidity out of main
        const {speed} = data.wind //take speed value out of wind
        document.querySelector('.city').innerText = "Weather in " + name
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector('.description').innerText =  description
        document.querySelector('.temp').innerText = temp + "°C"
        document.querySelector('.humidity').innerText = "Humidity:  " + humidity + "%"
        document.querySelector('.speed').innerText = "Wind:  " + speed + "km/h"
        document.querySelector('.weather').classList.remove('loading')
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    //What you search gets fetched.
    search: function () {
        this.fetchWeather(document.querySelector('.searchbar').value) 
        //use this. since fetchWeather is already in the object of weather
    }
}

//Make the searchbar work (on click and on enter)
document.querySelector('.search button')
.addEventListener("click", function(){
    weather.search()
})
document.querySelector('.searchbar').addEventListener('keyup', function (event){
    if (event.key === "Enter"){
        weather.search()
    }
})

//On page-load, show default weather for a city
weather.fetchWeather("Vancouver")

//in console search: weather.fetchWeather('tokyo')
