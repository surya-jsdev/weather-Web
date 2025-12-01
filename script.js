
const searchbtn = document.getElementById("searchbtn");
const citynameInput = document.getElementById("cityname");
const weatherResult = document.getElementById("weatherResult");

function findweather() {
    const cityname = citynameInput.value.trim();
    if (!cityname) {
        weatherResult.innerHTML = `<p>Please Enter City</p>`;
        citynameInput.style.border = "2px solid red";
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6dae0c680675edcbd02e5e03d95b8a81&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod != 200) {
                weatherResult.innerHTML = `<p>Error: City not found</p>`;
                return;
            }
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            citynameInput.style.border = "none";
            weatherResult.innerHTML = `
            <div class="weatherresult">
                <h3>City:${data.name}<img src="${iconUrl}" alt="Weather Icon"></h3>
                 
               <p class="temp">  <strong>Temperature:</strong>${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
                </div>
            `;
            citynameInput.value = "";
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML =
                `<p>Network error</p>`;
            console.error(error);
        });
}

searchbtn.addEventListener("click", findweather);

citynameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        findweather();
    }
});
// console.log("Loading...");
// setTimeout(() => {
//     console.log("order Completed");
    
// }, 5000);