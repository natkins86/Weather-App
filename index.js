//Date & Time//
let now =new Date();

let todayIs = document.querySelector("#today");

let date = now.getDate();

let hours=now.getHours();
let minutes=now.getMinutes();
let minute = minutes <= 9 ? "0" + minutes : minutes;

let months=["January", "February", "March","April", "May", "June", "July","August","September","October","November", "Decemeber"];
let month = months[now.getMonth()];

let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let day=days[now.getDay()];

todayIs.innerHTML = `${day}, ${date}th of ${month}, ${hours}:${minute}`;

//Location & Weather//

function formatDay(timestamp){
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[day];

}

function displayForecast(response){
    let forecast =response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay,index){
        if(index<4){
    forecastHTML= forecastHTML + 
    `
    <div class="col-sm-6" id="weather-card-tomorrow">
        <div class="card" id="tomorrow">
            <div class="card-header">${formatDay(forecastDay.dt)}</div>
            <img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="" 
            width="80" />
            <h6>
                🌡️ ${Math.round(forecastDay.temp.min)}°C - ${Math.round(forecastDay.temp.max)}°C
            </h6>
        </div>
    </div>
    `;
    }
});
forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML= forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
    let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response){
    document.querySelector("#city").innerHTML =response.data.name;
    document.querySelector("#temp").innerHTML =Math.round(response.data.main.temp);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celciusTemperature = response.data.main.temp;

    getForecast(response.data.coord);
    
}

function searchCity (event){
    event.preventDefault();
    let city = document.querySelector("#inlineFormInputGroupUsername").value;
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=8b2940a8dc3cd76e02df783cc567ef5e`;
    axios.get(apiUrl).then(displayWeather);
   
}

function searchLocation(position){
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=8b2940a8dc3cd76e02df783cc567ef5e`;
    axios.get(apiUrl).then(displayWeather);}
    
function getCurrentLocation (event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
      }

      function convertToFahrenheitLink(event){
        event.preventDefault();
        let temperatureElement = document.querySelector("#temp");
        celciusLink.classList.remove("active");
        fahrenheitLink.classList.add("active)");
        let temperature = (celciusTemperature*9)/5 +32;
        temperatureElement.innerHTML = Math.round(temperature);
    }
    
    function convertToCelciusLink(event){
        event.preventDefault();
        let temperatureElement = document.querySelector("#temp");
        celciusLink.classList.add("active");
        fahrenheitLink.classList.remove("active)");
        temperatureElement.innerHTML =Math.round(celciusTemperature);
    }
let currentLocationLink = document.querySelector("#here");
currentLocationLink.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#sb-form");
searchForm.addEventListener("submit", searchCity);

let celciusTemperature = null

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitLink);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelciusLink);




//Unit of Measure//


//Icons but 'funner'//








