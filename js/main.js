const API_KEY = '55c2fecd650724ce09bf1acb1efb65d5';

const BASE_URL = 'https://api.openweathermap.org';


//Sets up init state of Weather App
let state = {
  city: null,
  temperature: {
    kelvin: null,
    fahrenheit: null,
    celsius: null,
  },
  weatherCondition: null,
  weatherDescription: null, 
  weatherIcon: null, 
  zip: '47150',
  errorStatus: false,
  errorMessage: ""
};


//code to set up input/start screen
window.onload = function createStartPage() {
  //set up page width
  let doc = document.getElementById("main");
  doc.style.border = "solid 2px";
  doc.className = "m-5";

  //Parent div for the title
  let titleDiv = document.createElement('div');
  titleDiv.className = 'display-1 m-5 text-center'
  main.appendChild(titleDiv);

  //creation of the App Title
  let titleTag = document.createElement('h1');
  titleTag.innerText = "Weather App";
  titleTag.className = "display-1";
  titleDiv.appendChild(titleTag);
  

  //Parent div for the input and button
  let inputDiv = document.createElement('div');
  inputDiv.className = 'text-center';
  main.appendChild(inputDiv);
  

  //creation of zip code input field
  let zipInput = document.createElement('input');
  zipInput.type = "text";
  zipInput.id = 'zipCodeBox';
  zipInput.className = "p-1 me-5";
  zipInput.placeholder = "Enter 5 digit zip code"
  inputDiv.appendChild(zipInput);

  //creation of submit button in html
  let submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerText = "Get Weather";
  submitBtn.className = "btn btn-info mb-2";
  inputDiv.appendChild(submitBtn);  

  //creation of error message container in html
  let errorDiv = document.createElement('div');
  errorDiv.className = "me-5 mb-5";
  errorDiv.id = 'errorDiv';
  errorDiv.style.display = `None`;
  main.appendChild(errorDiv);

  //creation of error message
  let errorMessageDiv = document.createElement('div');
  errorMessageDiv.innerText = `${state.error}`;
  errorMessageDiv.className = "text-center pe-5 me-5 text-danger h6";
  errorMessageDiv.id = 'errorMessageTextNode';
  errorDiv.appendChild(errorMessageDiv);

  /*calls function that creates the html to store api
  weather data - set to display none until after button click */
  renderWeatherPane();

  //calls function that handles button click - either error or success
  submitBtn.addEventListener('click', handleGetWeatherBtnClick);
};


function handleGetWeatherBtnClick() {
  //sets zip code input to reusable variable
  let newZip = document.getElementById('zipCodeBox').value;

  //reset error state
  state.errorStatus = false;
  state.errorMessage = "";

  //calls function that grabs weather data based on zip code
  getWeatherData(newZip);  
};


//API FUNCTION - takes in zip code obtained from button click
function getWeatherData(zip) {
  let options = {
    baseURL: BASE_URL,
    params: {
      zip: zip,
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
    })
    .catch(function (error) {
      console.log(error);
      state.errorStatus = true;
      state.error = error.response.data.message;
    })
    .finally(function () {
      // always executed
      displayWeatherDataResult(); //function handles both error and success cases
  });
};


//handles conversion of kelvin to fahrenheit
function convertToF(num) {
  let f = Math.floor((num - 273.15) * 9/5 + 32)
  return f;
};


//handles conversion of kelvin to celsius
function convertToC(num) {
  let c = Math.floor(num - 273.15);
  return c;
};

    
/*Set up the html elements for the information from the API
after button click! Function is called in initial setup function */
function renderWeatherPane() {
  //sets up html that contains all weather components
  let weatherDiv = document.createElement('div');
  weatherDiv.className = "m-5 text-center";
  weatherDiv.style.border = "solid 2px";
  weatherDiv.id = "weatherDiv";
  weatherDiv.style.display = "none";
  main.appendChild(weatherDiv);

  //creation of html div that holds the city name
  let cityDiv = document.createElement('div');
  cityDiv.className = "display-3 mt-5";
  cityDiv.innerText = "City";
  cityDiv.id = 'cityDiv';
  weatherDiv.appendChild(cityDiv);

  //sets up div that contains the 3 different temperatures 
  let tempDiv = document.createElement('div');
  tempDiv.className = "d-flex flex-row justify-content-evenly display-5 mt-5 mb-5";
  weatherDiv.appendChild(tempDiv);

  //Kelvin Column
  let kelvinDiv = document.createElement('div');
  kelvinDiv.className = 'col-4';
  kelvinDiv.id = 'kelvinDiv';
  kelvinDiv.innerText = "K";
  tempDiv.appendChild(kelvinDiv);

  //Fahrenheit Column
  let fahrenheitDiv = document.createElement('div');
  fahrenheitDiv.className = 'col-4';
  fahrenheitDiv.id = 'fahrenheitDiv';
  fahrenheitDiv.innerText = "F";
  tempDiv.appendChild(fahrenheitDiv);

  //Celsius Column
  let celsiusDiv = document.createElement('div');
  celsiusDiv.className = 'col-4';
  celsiusDiv.id = 'celsiusDiv';
  celsiusDiv.innerText = "C";
  tempDiv.appendChild(celsiusDiv);
  
  //Div that contains the weather condition and Description
  let wConditionDiv = document.createElement('div');
  weatherDiv.appendChild(wConditionDiv);
  wConditionDiv.className;

  //Div that holds main weather condition
  let conDiv = document.createElement('div');
  wConditionDiv.appendChild(conDiv);
  conDiv.innerText = "Weather Condition";
  conDiv.id = 'conDiv';

  //inner div for weather condition description
  let conDesDiv = document.createElement('div');
  conDesDiv.innerText = "Weather Description";
  conDesDiv.id = 'conDesDiv';
  wConditionDiv.appendChild(conDesDiv);

  //creates div that holds the weather icon img
  let weatherIconDiv = document.createElement('div');
  weatherDiv.appendChild(weatherIconDiv);
  
  //creation of api weather icon in html
  let weatherIconImg = document.createElement('img');
  weatherIconImg.src = "";
  weatherIconImg.id = 'weatherIconImg';
  weatherIconDiv.appendChild(weatherIconImg);
};


//function that will display the results of getWeatherData - both if it fails or succeeds
function displayWeatherDataResult() {
  if (state.errorStatus === true) {
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.style.display = 'block';
    let errorMessageDiv = document.getElementById('errorMessageTextNode');
    errorMessageDiv.innerText = `Error: ${state.error}`;
    let weatherPane = document.getElementById('weatherDiv');
    weatherPane.style.display = "none";
  } else {
    document.getElementById('cityDiv').innerText = `${state.city}`;
    document.getElementById('kelvinDiv').innerText = `${Math.floor(state.temperature.kelvin)}k`;
    document.getElementById('fahrenheitDiv').innerText = `${convertToF(state.temperature.kelvin)}f`;
    document.getElementById('celsiusDiv').innerText = `${convertToC(state.temperature.kelvin)}c`;
    document.getElementById('conDiv').innerText = `${state.weatherCondition}`;
    document.getElementById('conDesDiv').innerText = `${state.weatherDescription}`;
    document.getElementById('weatherIconImg').src = `http://openweathermap.org/img/wn/${state.weatherIcon}@2x.png`;
    let weatherPane = document.getElementById('weatherDiv');
    weatherPane.style.display = "block";
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.style.display = 'none';
  }
};
