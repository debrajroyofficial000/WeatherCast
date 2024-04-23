// API KEY
const API_KEY = "40beff515afe491aa6d182821242104";

async function getWeatherAtLocation(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );
    return await response.json();
  } catch (error) {
    console.log("there is some network issue");
  }
}

const Input = document.getElementById("searchInput");
const Button = document.getElementById("searchBtn");

const createLocationDetails = (locationDetails) => {
  const locationContainer = document.getElementById("locationContainer");

  const name = document.createElement("h2");
  const location = document.createElement("h3");

  name.textContent = locationDetails.name;

  location.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${locationDetails.country} `;
  locationContainer.appendChild(name);
  locationContainer.appendChild(location);
};

const createWeatherDetails = (current) => {
  // temperature icon
  const tempImageContainer = document.getElementById("tempImageContainer");
  const tempImage = document.createElement("img");
  tempImage.alt = "temp img";
  tempImage.src = current.condition.icon;
  tempImageContainer.appendChild(tempImage);

  const cardsContainer = document.getElementById("cardsContainer");

  // temperature
  const temperatureCard = document.createElement("div");
  temperatureCard.className = "card";
  const temperatureH3 = document.createElement("h3");
  temperatureH3.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> ${current.temp_c} °C`;
  temperatureCard.appendChild(temperatureH3);
  cardsContainer.appendChild(temperatureCard);

  // temperature condition
  const temperatureTextCard = document.createElement("div");
  temperatureTextCard.className = "card";
  const temperatureTextH3 = document.createElement("h3");
  temperatureTextH3.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> ${current.condition.text}`;
  temperatureTextCard.appendChild(temperatureTextH3);
  cardsContainer.appendChild(temperatureTextCard);

  // wind speed
  const windSpeedCard = document.createElement("div");
  windSpeedCard.className = "card";
  const windSpeedH3 = document.createElement("h3");
  windSpeedH3.innerHTML = `<i class="fa-solid fa-wind"></i> ${current.wind_kph} kph`;
  windSpeedCard.appendChild(windSpeedH3);
  cardsContainer.appendChild(windSpeedCard);

  // humidity
  const humidityCard = document.createElement("div");
  humidityCard.className = "card";
  const humidityH3 = document.createElement("h3");
  humidityH3.innerHTML = `<i class="fa-solid fa-droplet"></i> ${current.humidity}`;
  humidityCard.appendChild(humidityH3);
  cardsContainer.appendChild(humidityCard);
};

const showWeatherData = (data) => {
  console.log(data);

  createLocationDetails(data.location);

  createWeatherDetails(data.current);
};

Button.addEventListener("click", () => {
  let location;
  if (Input.value && Input.value.trim !== "") {
    location = Input.value;
  }
  const result = getWeatherAtLocation(location);
  result.then((data) => showWeatherData(data));
});
