const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameCity.value === "" || nameCountry.value === "") {
    mostrarError("Los dos campos son obligatorios");
    return;
  }

  callAPI(nameCity.value, nameCountry.value);
  /* console.log(nameCity.value);
  console.log(nameCountry.value); */
});

function callAPI(city, country) {
  const apiId = "39693126cced14df25a861f4e53c6be3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
  //https://api.openweathermap.org/data/2.5/weather?q=santiago,Chile&appid=39693126cced14df25a861f4e53c6be3

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod === "404") {
        mostrarError("No encontre la ciudad");
      } else {
        limpiarHTML();
        mostrarClima(dataJSON);
      }
      console.log(dataJSON);
    })
    .catch((error) => {
      console.log(error);
    });
}

function mostrarClima(data) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = data;

  const grados = kelvinACentigrados(temp);
  const gradosMin = kelvinACentigrados(temp_min);
  const gradosMax = kelvinACentigrados(temp_max);

  const content = document.createElement("div");
  content.innerHTML = `
      <h5>${name}</h5>
      <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
      <h2>${grados}°C</h2>
      <p>Max: ${gradosMax}°C</p>
      <p>Min: ${gradosMin}°C</p>
    `;

  result.appendChild(content);

  console.log(name);
  console.log(temp);
  console.log(temp_max);
  console.log(temp_min);
  console.log(arr.icon);
}

function mostrarError(message) {
  console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 1500);
}

function kelvinACentigrados(temp) {
  return parseInt(temp - 273.15);
}

function limpiarHTML() {
  result.innerHTML = "";
}
