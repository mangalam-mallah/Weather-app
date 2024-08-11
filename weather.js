//Weather App

const weatherForm = document.getElementById("WeatherForm")
const  cityInput = document.querySelector(".CityInput") 
const  card = document.querySelector(".card") 
const apikey = "e87ad6211844010d59cfb25b3cc008c1"

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try {
            const weather = await weatherData(city);
            displayData(weather)
        }
        catch(err) {
            console.log(err);
            displayError(err)
        }
    }
    else {
        displayError("Please Enter a city")
    }
})

async function weatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(apiUrl)
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json()
}

function displayData(data) {
    console.log(data);
    const {name : city,
        main : {temp, humidity},
        weather : [{description, id}]
    } = data

    console.log(description);
    

    card.textContent = ""
    card.style.display = "flex"
    const cityDisplay = document.createElement("h1")
    const temperature = document.createElement("p")
    const HumidityDisplay = document.createElement("p")
    const descripdisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")
    
    cityDisplay.textContent = city
    temperature.textContent = (`${(temp - 273.15).toFixed(2)}°C`);
    HumidityDisplay.textContent = `Humidity : ${humidity}`
    descripdisplay.textContent = description
    weatherEmoji.textContent = emoji(id)

    temperature.classList.add("temperature")
    cityDisplay.classList.add("CityName")
    HumidityDisplay.classList.add("Humidity")
    descripdisplay.classList.add("descriptions")
    weatherEmoji.classList.add("Emoji")

    card.appendChild(cityDisplay)
    card.appendChild(temperature)
    card.appendChild(HumidityDisplay)
    card.appendChild(descripdisplay)
    card.appendChild(weatherEmoji)
}

function emoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere (mist, smoke, etc.)
        case (weatherId === 800):
            return "☀️"; // Clear sky
        case (weatherId > 800):
            return "☁️"; // Clouds
        default:
            return "🌈"; // Default fallback emoji
    }
}

function displayError(message) {
    const error = document.createElement("p")
    error.textContent = message
    error.classList.add("Error")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(error)
}