

const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", () => {
    const apiKey = "6dae0c680675edcbd02e5e03d95b8a81";

    const cityname = document.getElementById("cityname").value.trim();
    if (cityname==="") {
        alert("please enter a city");
        return
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(res => res.json())

        .then(data => {
            if (data.cod != 200) {
                document.getElementById("weatherResult").innerHTML =
                    `<p>Error: ${data.message}</p>`;
                return;
            }

            document.getElementById("weatherResult").innerHTML = `
                <h3>${data.name}</h3>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML =
                `<p>Network error</p>`;
            console.error(error);
        });
})
