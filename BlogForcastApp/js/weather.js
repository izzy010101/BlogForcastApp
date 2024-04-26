// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

// 1023ab5f28800dcc135703b61cc68606 - API key

const heading = document.querySelector("h2");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const icon = document.querySelector(".icon_api")
const country = document.querySelector(".country");
const sunrise = document.querySelector(".sun span:first-of-type");
const sunset = document.querySelector(".sun span:last-of-type");
const wind = document.querySelector(".wind");

document.addEventListener('DOMContentLoaded', function () {
    
    const lastSearchedCity = JSON.parse(localStorage.getItem('key'));

    if(lastSearchedCity) {
            console.log(lastSearchedCity);
            heading.textContent = lastSearchedCity.heading;
            temp.innerHTML = lastSearchedCity.temp + `&deg;C`;
            desc.textContent = lastSearchedCity.desc;
            icon.src = `https://openweathermap.org/img/w/${lastSearchedCity.icon}.png`;
            country.textContent = lastSearchedCity.country;
            sunrise.textContent = lastSearchedCity.sunrise;
            sunset.textContent = lastSearchedCity.sunset;
            wind.textContent = "Wind: " + lastSearchedCity.wind + "km/h";
    }
})



const btn = document.querySelector("button");

btn.addEventListener('click', () => {

    const input = document.querySelector("input");
    let inputValue = input.value;
    let err = document.querySelector("#err");
    
    fetchWeather(inputValue);



});


function fetchWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1023ab5f28800dcc135703b61cc68606&units=metric`;

    

    fetch(url)
    
    
        .then(response => response.json())
        .then(data => {
    
            if(data.cod === '404') {
    
                err.textContent = data.message;
                err.classList.remove("hidden");
                err.classList.add("text-red-500");
    
            } else {
                
                err.classList.add("hidden");

                displayData(data);
                
    
                let forcast = {
                    heading : data.name,
                    temp :  Math.ceil(data.main.temp),
                    desc :  data.weather[0].description,
                    icon : data.weather[0].icon,
                    country :  data.sys.country,
                    sunrise : getTimeFromTimestamp(data.sys.sunrise),
                    sunset :getTimeFromTimestamp(data.sys.sunset),
                    wind :  data.wind.speed + "km/h",
                };
    
                    addLocalStorage(forcast);
                
            }
            
            console.log(data);
            
        })
    
        .catch(error => {
            console.log("error fetching data: " , error);
        })
}


function getTimeFromTimestamp(timestamp) {
    
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let time = addZeroToTime(hours) + ":" + addZeroToTime(minutes);

    return time;
}


function addZeroToTime(param) {
    let counter = "9";

    if(param <= counter) {
     param = "0" + param;
    }
    return param;
}


function addLocalStorage(param) {

    localStorage.setItem("key", JSON.stringify(param));
    
}


function displayData(data) {

        heading.textContent = data.name;
        temp.innerHTML = Math.ceil(data.main.temp) + `&deg;C`;
        desc.textContent = data.weather[0].description;
        icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        country.textContent = data.sys.country;
        sunrise.textContent = getTimeFromTimestamp(data.sys.sunrise);
        sunset.textContent = getTimeFromTimestamp(data.sys.sunset); 
        wind.textContent = "Wind: " + data.wind.speed + "km/h";

}

