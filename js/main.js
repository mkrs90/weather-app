let a = "here"
const API_KEY = '55c2fecd650724ce09bf1acb1efb65d5';
const BASE_URL = 'https://api.openweathermap.org';



//code to set up input/start screen
window.onload = function createStartPage() {
  //set up page width
  let doc = document.getElementById("main");
  //doc.style.width = "600px";
  doc.style.border = "solid 2px";
  doc.className = "m-5";

  //Parent div for the title
  let titleDiv = document.createElement('div');
  main.appendChild(titleDiv);
  titleDiv.className = 'display-1 m-5 text-center'

  //creation of the App Title
  let titleTag = document.createElement('h1');
  let titleText = document.createTextNode("Weather App");
  titleDiv.appendChild(titleTag.appendChild(titleText));
  titleTag.className = "display-1";

  //Parent div for the input and button
  let inputDiv = document.createElement('div');
  main.appendChild(inputDiv);
  inputDiv.className = 'mb-5 text-center'

  //creation of zip code input field
  let zipInput = document.createElement('input');
  zipInput.type = "text";
  zipInput.className = "p-1 me-5";
  zipInput.maxLength = "5";
  zipInput.placeholder = "Enter 5 digit zip code"
  inputDiv.appendChild(zipInput);

  //creation of submit button
  let submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = "btn btn-info";
  let btnText = document.createTextNode("Get Weather");
  submitBtn.appendChild(btnText);
  inputDiv.appendChild(submitBtn);

  

  //calls getWeather on button click
  submitBtn.addEventListener('click', getWeather);
}

function getWeather() {
  showWeather();
};


let state = {
    //start here by inputting what you want to pull from the api (temp, city, ...)
    city: null, //response.data.name
    temperature: {
      kelvin: null, //response.data.main.temp
      fahrenheit: null, //will have to run through function
      celsius: null, //will have to run through function
    },
    weatherCondition: null, //response.data.weather.main
    weatherDescription: null, //response.data.weather.description
    weatherIcon: null, //response.data.weather.icon
    zip: '47150',
    //hidden vs shown upon click
  }

function getData() {
    let options = {
      baseURL: BASE_URL,
      params: {
        zip: state.zip,
        country: 'us',
        appid: API_KEY
      }
    }
    
    axios.get(`/data/2.5/weather`, options)
      .then(function (response) {
        console.log(response);
        state.city = response.data.name;
        state.temperature.kelvin = response.data.main.temp;
        state.weatherCondition = response.data.weather[0].main;
        state.weatherDescription = response.data.weather[0].description;
        state.weatherIcon = response.data.weather[0].icon;
        console.log(state);
        document.getElementById('activityDiv').innerHTML = `Activity: ${state.activity}!<br>Type: ${state.type} <br>Price Range: ${state.price}`;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
    });
  }

  //create function that changes kelvin into F and C

  //Set up the html elements for the information from the API after button click! 
function showWeather() {
  let weatherDiv = document.createElement('div');
  main.appendChild(weatherDiv);
  weatherDiv.className = "m-5 text-center";
  weatherDiv.style.border = "solid 2px"
  //city div
  //create city H1 
  //append to div
  let cityDiv = document.createElement('div');
  cityDiv.className = "display-3 mt-5";
  weatherDiv.appendChild(cityDiv);
  let cityTag = document.createElement('h2');
  let cityText = document.createTextNode("city name");
  cityDiv.appendChild(cityTag.appendChild(cityText));
  cityTag.className;

  //temp div
  //needs 3 columns
  //append to div
  let tempDiv = document.createElement('div');
  tempDiv.className = "d-flex flex-row justify-content-evenly display-5 mt-5 mb-5";
  weatherDiv.appendChild(tempDiv);
  let kelvinDiv = document.createElement('div');
  kelvinDiv.className = 'col-3';
  tempDiv.appendChild(kelvinDiv);
  let kText = document.createTextNode(`Ktemp`);
  kelvinDiv.appendChild(kText);
  let fahrenheitDiv = document.createElement('div');
  fahrenheitDiv.className = 'col-3';
  tempDiv.appendChild(fahrenheitDiv);
  let fText = document.createTextNode(`Ftemp`);
  fahrenheitDiv.appendChild(fText);
  let celsiusDiv = document.createElement('div');
  celsiusDiv.className = 'col-3';
  tempDiv.appendChild(celsiusDiv);
  let cText = document.createTextNode(`ctemp`);
  celsiusDiv.appendChild(cText);
  

  //condition div
  //add main condition
  //add condition description

  //other info div
  //add the icon here
  //give hefty margin

}