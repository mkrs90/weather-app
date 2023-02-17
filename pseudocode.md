# Pseudocode for weather-app


What needs to happen overview: 

render the website when the website loads
onload renderWebsite();  
       renderErrorBox();
       renderWeatherPane();

User will enter zipcode into input box 
user will click submit "Get Weather"
zip code will be sent through api
api will send back response with appropriate data
data will populate the weatherPane();
make the weatherPane visible to the user when available 

if the zipcode is not correct populate the errorbox with error message from the api call.


START --> clickbutton() --> outputs zipcode
input zipcode --> API call getWeatherData() --> outputs response from api (both data and errors)
input api response --> funtion that displays the weather data or error - END



## Questions
    - How do we make sure the input only contains integers and can only contain 5 characters? When should we clear out the input or should we?
    - What endpoint are we using from the API? Are there query parameters to send over? Where do I put the API Key?
    - What happens when we enter new information for the second time? 
    - When I click the button does it always automatically hide the bottom pane?


## HTML/CSS
    Conditional rendering
        - When you first load page, the only thing you see is the input and the button
        - After submission of a zip code you will see the rest.

### Atoms
#### Input 
    - Protecting the input 

### Organism


## Objectives
    - Single div for the whole application
    - document.createElement 
    - document.appendChild
    - Use zip code input to fetch data from Open Weather Map API
    - Axios / onClick or onSubmit
    - Handle successful or unsuccessful attempts to the API
    - If the request is successful, display the following in a 'mobile app' format:
    - City name
    - Current weather conditions
    - Current temperature in Kelvin, Fahrenheit, and Celsius
    - A unique image, decided by the current temperature (The API has icons built-in, be sure to read the docs)
    - If the request is unsuccessful, display a specific error message such as "Invalid Zip Code" or anything else that might come back from the API.
    - Handle multiple attempts to enter a zip code
    - Look good on desktop and mobile using Bootstrap


## Variables
    STATE
    currentWeather (obj)
        City
        Conditions
        Temperature - {} (k,f,c)
        Image / icon
    zipCode that got passed in?
    showConditions: boolean
    errorMessage: ‘’ 
## Functions
    - init()
    - convertTemperature()
    - buildHTML() elements
        - Show city, populate with state data currentWeather.city
        - Show temperature
        - Change the src of the image tag to the currentWeather.image
        - Populate with api data
    - changeHTML()
    - getData - call the api
        - Uses axios to call some endpoint ?
            .then for success()
            updateState()
            .then for state updated
            buildHTML()
            .catch for failure()
            handleError()


## Procedures
CREATE GETDATA FUNCTION

INIT
Add a zip code input 
Add a button
Add the title of the page
Add placeholders elements for all the organisms (Temp, City, Conditions)
         Hide these until submit is pressed
Bind event handler to the button - getData()

START
Get Data
Build the HTML
Fill the HTML with the Data

INIT
Api key
Api url

State object

Init getData function


Build HTML elements
Div - to contain Title, input box for zip, and submit button

Div- that contains api content
	Div that contains city name
	Div that has 3 columns
		Kelvin
		Cel
		Fair
	Div that contains weather condition
	Div that contains weather icon


=====================================================================

## TODO

1. Get API Key
2. Enter key & Url into javascript
3. CND for bootstrap and axios
3. Link CSS and JS to html
4. Create single div in html
5. set up H1 for title
6. add form field for zip code input
7. add button to submit zip
8. set up axios promise in js
9. set up state
10. set up different functions

11. set up function that converts temp
12. seperate out showWeather() and getData on click. 
13. Need a way to take zip and use in getData();


