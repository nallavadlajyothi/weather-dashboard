const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const weatherContent = document.getElementById("weatherContent");
const errorMessage = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");
const visibility = document.getElementById("visibility");

const dateElement = document.getElementById("date");
const forecastContainer = document.getElementById("forecast");


// Demo weather data
const weatherData = {
    Chennai: {
        temperature: 31,
        condition: "Partly Cloudy",
        icon: "🌤️",
        humidity: 72,
        wind: 14,
        feels: 34,
        visibility: 8,
        forecast: [
            ["Today", "🌤️", 31, "Partly Cloudy"],
            ["Tomorrow", "☀️", 33, "Sunny"],
            ["Friday", "🌧️", 29, "Rain"],
            ["Saturday", "⛅", 30, "Cloudy"],
            ["Sunday", "☀️", 32, "Sunny"]
        ]
    },

    Bangalore: {
        temperature: 25,
        condition: "Cloudy",
        icon: "☁️",
        humidity: 78,
        wind: 11,
        feels: 26,
        visibility: 7,
        forecast: [
            ["Today", "☁️", 25, "Cloudy"],
            ["Tomorrow", "🌧️", 24, "Rain"],
            ["Friday", "⛅", 26, "Cloudy"],
            ["Saturday", "☀️", 27, "Sunny"],
            ["Sunday", "🌦️", 25, "Showers"]
        ]
    },

    Hyderabad: {
        temperature: 28,
        condition: "Sunny",
        icon: "☀️",
        humidity: 55,
        wind: 16,
        feels: 30,
        visibility: 10,
        forecast: [
            ["Today", "☀️", 28, "Sunny"],
            ["Tomorrow", "☀️", 30, "Sunny"],
            ["Friday", "⛅", 29, "Cloudy"],
            ["Saturday", "🌧️", 27, "Rain"],
            ["Sunday", "☀️", 31, "Sunny"]
        ]
    },

    Mumbai: {
        temperature: 29,
        condition: "Rainy",
        icon: "🌧️",
        humidity: 82,
        wind: 19,
        feels: 32,
        visibility: 6,
        forecast: [
            ["Today", "🌧️", 29, "Rain"],
            ["Tomorrow", "🌦️", 28, "Showers"],
            ["Friday", "🌧️", 27, "Rain"],
            ["Saturday", "☁️", 29, "Cloudy"],
            ["Sunday", "⛅", 30, "Partly Cloudy"]
        ]
    }
};


function showWeather(city) {

    const formattedCity =
        city.charAt(0).toUpperCase() +
        city.slice(1).toLowerCase();

    const data = weatherData[formattedCity];

    if (!data) {
        errorMessage.textContent =
            "Demo data is available for Chennai, Bangalore, Hyderabad and Mumbai.";

        weatherContent.classList.add("hidden");
        return;
    }

    errorMessage.textContent = "";
    weatherContent.classList.remove("hidden");

    cityName.textContent = formattedCity;

    temperature.textContent = `${data.temperature}°C`;
    condition.textContent = data.condition;
    weatherIcon.textContent = data.icon;

    humidity.textContent = `${data.humidity}%`;
    wind.textContent = `${data.wind} km/h`;
    feels.textContent = `${data.feels}°C`;
    visibility.textContent = `${data.visibility} km`;

    dateElement.textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    forecastContainer.innerHTML = "";

    data.forecast.forEach(day => {

        const card = document.createElement("div");

        card.className = "forecast-card";

        card.innerHTML = `
            <h3>${day[0]}</h3>
            <div class="icon">${day[1]}</div>
            <strong>${day[2]}°C</strong>
            <p>${day[3]}</p>
        `;

        forecastContainer.appendChild(card);
    });
}


// Search
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    showWeather(city);
});


// Enter key
cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// Location button
locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        errorMessage.textContent =
            "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        () => {
            showWeather("Chennai");
        },
        () => {
            errorMessage.textContent =
                "Location permission denied. Showing Chennai weather.";
            showWeather("Chennai");
        }
    );

});


// Default city
showWeather("Chennai");
