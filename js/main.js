const API_KEY = '55c2fecd650724ce09bf1acb1efb65d5';
const BASE_URL = 'https://api.openweathermap.org';

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
  errorStatus: false,
  errorMessage: "",
  //hidden vs shown upon click
}

//code to set up input/start screen
window.onload = function createStartPage() {
  //set up page width
  let doc = document.getElementById("main");
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
  // inputDiv.id = "form";
  inputDiv.className = 'text-center'

  //creation of zip code input field
  let zipInput = document.createElement('input');
  zipInput.type = "text";
  zipInput.id = 'zipCodeBox';
  zipInput.className = "p-1 me-5";
  zipInput.minLength = "5";
  zipInput.maxLength = "5";
  zipInput.placeholder = "Enter 5 digit zip code"
  inputDiv.appendChild(zipInput);

  //creation of submit button
  let submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = "btn btn-info mb-2";
  let btnText = document.createTextNode("Get Weather");
  submitBtn.appendChild(btnText);
  inputDiv.appendChild(submitBtn);

  // let errorDiv = document.createElement('div');
  // errorDiv.className = "me-5 mb-5";
  // main.appendChild(errorDiv);
  // errorDiv.style.display = `${state.hideShowMessage}`;
  // let errorMessageDiv = document.createElement('div');
  // errorDiv.appendChild(errorMessageDiv);
  // let errorMessage = document.createTextNode(`${state.error}`);
  // errorMessageDiv.appendChild(errorMessage); 
  // errorMessageDiv.className = "text-center pe-5 me-5 text-danger h6";

  let errorDiv = document.createElement('div');
  errorDiv.className = "me-5 mb-5";
  errorDiv.id = 'errorDiv';
  main.appendChild(errorDiv);
  errorDiv.style.display = `None`;
  let errorMessageDiv = document.createElement('div');
  errorDiv.appendChild(errorMessageDiv);
  let errorMessageTextNode = document.createTextNode(`${state.error}`);
  console.log(errorMessageTextNode);
  errorMessageDiv.appendChild(errorMessageTextNode); 
  errorMessageDiv.className = "text-center pe-5 me-5 text-danger h6";
  errorMessageDiv.id = 'errorMessageTextNode';

  renderWeatherPane();

  //calls getWeather on button click
  // inputDiv.addEventListener('click', getWeather);
  // state.zip = document.getElementsByTagName('input').value;
  submitBtn.addEventListener('click', handleGetWeatherBtnClick);


}


function handleGetWeatherBtnClick() {
  let newZip = document.getElementById('zipCodeBox').value;
  //reset error state
  state.errorStatus = false;
  state.errorMessage = "";
  getWeatherData(newZip);

// if (state.errorStatus === true) {
//   let errorDiv = document.getElementById('errorDiv');
//   errorDiv.style.display = 'block';
//   let errorMessageDiv = document.getElementById('errorMessage');
//   errorMessageDiv.innerHTML = `Error: ${state.error}`;
// } else {
//   populateWeather(newZip);
// }

  
};

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
        displayWeatherDataResult();
    });
  }

    //create function that changes kelvin into F and C
    function convertToF(num) {
      let f = Math.floor((num - 273.15) * 9/5 + 32)
      return f;
    };
  
    function convertToC(num) {
      let c = Math.floor(num - 273.15);
      return c;
    };



   
    
  //Set up the html elements for the information from the API after button click! 
function renderWeatherPane() {

  let weatherDiv = document.createElement('div');
  main.appendChild(weatherDiv);
  weatherDiv.className = "m-5 text-center";
  weatherDiv.style.border = "solid 2px";
  weatherDiv.id = "weatherDiv";
  weatherDiv.style.display = "none";

  let cityDiv = document.createElement('div');
  cityDiv.className = "display-3 mt-5";
  weatherDiv.appendChild(cityDiv);
  let cityTag = document.createElement('h2'); //wtf
  let cityText = document.createTextNode(`City`); //wwtyf
  cityDiv.appendChild(cityTag.appendChild(cityText)); //help me
  cityDiv.id = 'cityDiv';
  cityTag.className;

 
  let tempDiv = document.createElement('div');
  tempDiv.className = "d-flex flex-row justify-content-evenly display-5 mt-5 mb-5";
  weatherDiv.appendChild(tempDiv);
  let kelvinDiv = document.createElement('div');
  kelvinDiv.className = 'col-4';
  kelvinDiv.id = 'kelvinDiv';
  tempDiv.appendChild(kelvinDiv);
  let kText = document.createTextNode(`K`);
  kelvinDiv.appendChild(kText);
  let fahrenheitDiv = document.createElement('div');
  fahrenheitDiv.className = 'col-4';
  fahrenheitDiv.id = 'fahrenheitDiv';
  tempDiv.appendChild(fahrenheitDiv);
  let fText = document.createTextNode(`F`);
  fahrenheitDiv.appendChild(fText);
  let celsiusDiv = document.createElement('div');
  celsiusDiv.className = 'col-4';
  celsiusDiv.id = 'celsiusDiv';
  tempDiv.appendChild(celsiusDiv);
  let cText = document.createTextNode(`C`);
  celsiusDiv.appendChild(cText);
  

  let wConditionDiv = document.createElement('div');
  weatherDiv.appendChild(wConditionDiv);
  wConditionDiv.className;
  let conDiv = document.createElement('div');
  wConditionDiv.appendChild(conDiv);
  conDiv.className;
  conDiv.id = 'conDiv';
  let conText = document.createTextNode(`weather condition`);
  conDiv.appendChild(conText);

  //outer div for weather condition
  let wConditionDesDiv = document.createElement('div');
  weatherDiv.appendChild(wConditionDesDiv);
  wConditionDesDiv.className;
  //inner div for weather condition description
  let conDesDiv = document.createElement('div');
  wConditionDesDiv.appendChild(conDesDiv);
  conDesDiv.className;
  conDesDiv.id = 'conDesDiv';
  //sets text of inner weather condition description div
  let conDesText = document.createTextNode(`des`);
  conDesDiv.appendChild(conDesText);

  //other info div
  //add the icon here
  let weatherIconDiv = document.createElement('div');
  weatherDiv.appendChild(weatherIconDiv);
  weatherIconDiv.className;
  let weatherIconImg = document.createElement('img');
  weatherIconDiv.appendChild(weatherIconImg);
  weatherIconImg.src;
  weatherIconImg.id = 'weatherIconImg';
}

// function setZip() {
//   state.zip = "42303";
//   // state.zip;
//   // return state.zip;
// }

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
}


// function validateZipCode(newZip) {
//   //Code to test if newZip

//   return false;
// }
// document.getElementById('form').addEventListener('submit', setZip);
