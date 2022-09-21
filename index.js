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



function displayWeather(response){
    document.querySelector("#city").innerHTML =response.data.name;
    document.querySelector("#temp").innerHTML =Math.round(response.data.main.temp);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celciusTemperature = response.data.main.temp;
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








