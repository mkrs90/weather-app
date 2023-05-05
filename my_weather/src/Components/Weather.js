function Weather() {

    let weather = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=55c2fecd650724ce09bf1acb1efb65d5"
    console.log(weather)

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

    return (
        <div>
            
        </div>
    )
}

export default Weather;