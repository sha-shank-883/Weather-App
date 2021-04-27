const api = {
    key: "65d9e145af037705de9e0dc13e3a0b15",
    base: "https://api.openweathermap.org/data/2.5/"
}
// window.oncontextmenu = function (){
// console.log("right click Disabled");
// return false ;
// }


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('onclick', setQuery);

function setQuery() {

    getResults(searchbox.value);
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&APPID=${api.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let date = document.querySelector('.location .date');
    let now = new Date();
    date.innerText = dateBuilder(now);

    let time = document.querySelector('.location .time');
    let today = new Date();
    time.innerText = timeBuilder(today);


    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;


    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;


    let descweather_el = document.querySelector('.current .desc-weather');
    descweather_el.innerText = `(${weather.weather[0].description})`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    // let windspeed = document.querySelector('.wind-speed');
    // windspeed.innerText = `${weather.wind.speed} m/s`;


    let winddirection = document.querySelector('.wind-speed');
    let speed = `${(weather.wind.speed)}`;
    let direction = `${(weather.wind.deg)}`;
    winddirection.innerText = `${Math.round(sp())} km/h | ${deg()}`;


    function sp() {
        if (speed < 100) {
            return 3.6 * speed;
        }
        else {
            return "speed";
        }
    }

    function deg() {
        if (direction > 11.25 && direction <= 33.75) {
            return "NNE";
        } else if (direction > 33.75 && direction <= 56.25) {
            return "NE";
        } else if (direction > 56.25 && direction <= 78.75) {
            return "ENE";
        } else if (direction > 78.75 && direction <= 101.25) {
            return "E";
        } else if (direction > 101.25 && direction <= 123.75) {
            return "ESE";
        } else if (direction > 123.75 && direction <= 146.25) {
            return "SE";
        } else if (direction > 146.25 && direction <= 168.75) {
            return "SSE";
        } else if (direction > 168.75 && direction <= 191.25) {
            return "S";
        } else if (direction > 191.25 && direction <= 213.75) {
            return "SSW";
        } else if (direction > 213.75 && direction <= 236.25) {
            return "SW";
        } else if (direction > 236.25 && direction <= 258.75) {
            return "WSW";
        } else if (direction > 258.75 && direction <= 281.25) {
            return "W";
        } else if (direction > 281.25 && direction <= 303.75) {
            return "WNW";
        } else if (direction > 303.75 && direction <= 326.25) {
            return "NW";
        } else if (direction > 326.25 && direction <= 348.75) {
            return "NNW";
        } else {
            return "N";
        }

    }

    if (weather_el.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpeg')";

        //   } else if (weather_el.textContent == 'scatted clouds') {
        //     document.body.style.backgroundImage = "url('images/cloud 1.jpg')";

    } else if (weather_el.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    } else if (weather_el.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";

    } else if (weather_el.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";

    } else if (weather_el.textContent == 'Drizzle') {
        document.body.style.backgroundImage = "url('images/drizzle.jpeg')";

    } else if (weather_el.textContent == 'Smoke') {
        document.body.style.backgroundImage = "url('images/smoke.jpg')";

    } else if (weather_el.textContent == 'Fog') {
        document.body.style.backgroundImage = "url('images/fog.jpg')";


    } else if (weather_el.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('images/haze.jpeg')";

    } else if (weather_el.textContent == 'Mist') {
        document.body.style.backgroundImage = "url('images/mist.jpg')";

    } else if (weather_el.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
}

function timeBuilder(t) {
    let minutes = t.getMinutes();
    let hours = t.getHours();

    //    let seconds = t.getSeconds();
    let periods = hours >= 12 ? 'PM' : 'AM';
    hours = hours == 0 ? hours = 12 : hours;
    hours = hours % 12;
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //   seconds = seconds < 10 ? '0'+seconds : seconds;

    return `${hours}:${minutes} ${periods}`;
}

function dateBuilder(d) {
    let months = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}



//
//function getTime(offset) {
//    var d = new Date();
//    localTime = d.getTime();
//    localOffset = d.getTimezoneOffset() * 60000;
//
//    // obtain UTC time in msec
//    utc = localTime + localOffset;
//    // create new Date object for different city
//    // using supplied offset
//    var nd = new Date(utc + (3600000 * offset));
//    //nd = 3600000 + nd;
//    utc = new Date(utc);
//    // return time as a string
//    $("#local").html(nd.toLocaleString());
//    $("#utc").html(utc.toLocaleString());
//
//    console.log(getTime());
//}


    //          
    //      var weather= document.getElementById("demo");
    //      function getLocation() {
    //        if (navigator.geolocation) {
    //          navigator.geolocation.watchPosition(showPosition);
    //        } else {
    //          weather.innerHTML = "Geolocation is not supported by this browser.";
    //        }
    //      }
    //      function showPosition(position) {
    //        weather.innerHTML = "Lat: " + position.coords.lat +
    //        "<br>Lon: " + position.coords.lon;
    //      }
    //      
    //      showPosition();{
    //      console.log;
    //      }
    //      



 //    function directionBuilder(){
    //     let winddirection = document.querySelector('wind.speed');  
    //           direction = `${(weather.wind.deg)}`;
    //      winddirection= `${(weather.wind.deg)}`;
    //      console.log(weather.wind.deg);
    //  }     




    // const filteredCity = location.filter(city) => {
    //     return {
    //         city.name.tolowerCase().includes(searchString) ||
    //         city.country.tolowerCase().include(searchString)
    //     };
    // }
    // displayResults(filteredCity);




    //      function getCardinalDirection(angle) {
    //          if (typeof angle === 'string') angle = parseInt(angle);
    //          if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
    //          const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
    //          const directions = Object.keys(arrows);
    //          const directionree = 360 / directions.length;
    //          angle = angle + directionree / 2;
    //          for (let i = 0; i < directions.length; i++) {
    //            if (angle >= (i * directionree) && angle < (i + 1) * directionree) return arrows[directions[i]];
    //          }
    //          return arrows['north'];
    //      }

    // 
    // let winddirection = document.querySelector('.wind-direction');
    // let did =  Direction();
    // winddirection.innerText = directionBuilder(did);
    // 
    // 
    //   winddirection.innerText = `${weather.wind.speed} m/s | `;
    // 
    // 
    // 
    // 
    // function directionBuilder(D) {
    //   let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    //  let direction = directions[D.getDirection()];
    // direction += 22.5;
    // 
    // if (direction < 0)
    // direction = 360 - Math.abs(d) % 360;
    // else
    // direction = ded % 360;
    // 
    // let w = parseInt(direction / 45);
    // return `${directions[w]} ${weather.wind.direction}`;
    // }
    // 
    // 
    // if (winddirection.textContent == '30') {
    //   return "N";
    //    }




















