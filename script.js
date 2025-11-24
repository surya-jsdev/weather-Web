
const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", () => {
    const cityname = document.getElementById("cityname").value.trim();
    if (!cityname) {
        document.getElementById("weatherResult").innerHTML = `<p>Please Enter City</p>`;
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6dae0c680675edcbd02e5e03d95b8a81&units=metric`;
    fetch(url)
        .then(res => res.json())

        .then(data => {
            if (data.cod != 200) {
                document.getElementById("weatherResult").innerHTML =
                    `<p>Error: ${data.error}</p>`;
                return;
            }

            document.getElementById("weatherResult").innerHTML = `
            <div class=weatherresult>
                <h3>City:${data.name}</h3>
               <p class=temp>  <strong>Temperature:</strong>${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
                </div>
            `;
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML =
                `<p>Network error</p>`;
            console.error(error);
        });

})
