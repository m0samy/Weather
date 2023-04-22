//https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=cairo&days=3
//todays card variables
let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let todayIcon = document.getElementById("today-icon");
let description = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let searchBar = document.getElementById("search-bar");

//Next Days Variables
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description");


let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// let currentCity = "Cairo";
let responseData;
let apiResponse;

// get data from Api 
async function getWeatherData(currentCity = "Cairo"){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    responseData = await apiResponse.json()
    console.log(responseData)
    displayTodayWeather();
    displayNextDayWeather();
}
getWeatherData();

// display Today
function displayTodayWeather()
{
    let date = new Date()
    // console.log(date);
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
}


// display Next
function displayNextDayWeather()
{
    //بعرض اليومين 
    for( let i=0; i<nextDay.length;i++)
    {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
    }
}


//search
searchBar.addEventListener('keyup' , function () {
    currentCity = searchBar.value;
    // console.log(currentCity);
    getWeatherData(currentCity); 
})
