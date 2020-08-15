/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '392e5d9a3d7b22c70b1fbe753047af6b';

//const btn = document.getElementById("generate").value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Async Post Function
const postData = async (url = '', data = {}) => { 
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

const getWeatherInfo = async (baseURL, zipCode, apiKey) => {
    const request = await fetch(`${baseURL}?zip=${zipCode}&units=imperial&appid=${apiKey}`); 
        try {
        const allData = await request.json();
        return allData;
    }  
    catch(error) {
        console.log("error", error);
    }
};

// Updating the app dynamically with API's information + user input
const updateUI = async () => {
    const request = await fetch('/getAll');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.userResponse;
  
    }catch(error){
      console.log("error", error);
    }
  };

//Event listener for generate button
document.getElementById('generate').addEventListener('click', btnAction);

//Chaining async requests
function btnAction(e){
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;     
    getWeatherInfo(baseURL, zipCode, apiKey) 
    .then(function(data){ 
        console.log(data);
        postData('/addEntry', {temperature: data.main.temp,
                               date: newDate, 
                               userResponse: feelings});   

        updateUI();
    });
};