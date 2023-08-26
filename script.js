setInterval(update, 1000);

update();

function update(){
const currentDate = new Date();
const currentUTCTime = currentDate.getTime();
const offsetInMilliseconds = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes
const istTimeInMilliseconds = currentUTCTime + offsetInMilliseconds;
const istDate = new Date(istTimeInMilliseconds);
const istHours = istDate.getUTCHours();
const istMinutes = istDate.getUTCMinutes();
const istSeconds = istDate.getUTCSeconds();

if(istHours > 12){
  var a = istHours % 12;
  if(istMinutes <10){
  const formattedISTTime = `${a}:0${istMinutes} PM`;
  document.getElementById('time').innerHTML = formattedISTTime;
  }else{
    const formattedISTTime = `${a}:${istMinutes} PM`;
  document.getElementById('time').innerHTML = formattedISTTime;
  }
}else{
  if(istMinutes <10){
    const formattedISTTime = `${a}:0${istMinutes} AM`;
    document.getElementById('time').innerHTML = formattedISTTime;
    }else{
      const formattedISTTime = `${a}:${istMinutes} AM`;
    document.getElementById('time').innerHTML = formattedISTTime;
    }
}
}
/*-----------------------------------------------------------------------------------------------*/

function timecon(s){
const unixTimestamp = s;
const milliseconds = unixTimestamp * 1000;
const dateObject = new Date(milliseconds);
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const formattedDateTime = `${hours}:${minutes}`;
return formattedDateTime;
}

/*-----------------------------------------------------------------------------------------------*/

var value = 'assam';

window.onload = function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+value+'&appid=3045dd712ffe6e702e3245525ac7fa38&units=metric')
  .then(res => res.json())
  .then(data => 
  {
    var nameval = data['name']
    var descrip = data['weather']['0']['description']
    var wndspd = data['wind']['speed']
    var pressure = data['main']['pressure']
    var humidity = data['main']['humidity']
    var clouds = data['clouds']['all']
    var visibility = data['visibility']
    
    document.getElementById('desc').innerHTML = `<h1>${nameval}</h1>
                                                 <p>Wind Speed : ${wndspd} m/s</p>
                                                 <p>Pressure : ${pressure} hPa</p>
                                                 <p>Humidity : ${humidity} %</p>
                                                 <p>Cloudiness : ${clouds} %</p>
                                                 <p>Visibility : ${visibility} m</p>`
    

    const iconCode = data.weather[0].icon;
    const iconUrl = `weather/${iconCode}.png`;
                                         
    const iconImage = document.getElementById('img');
    iconImage.src = iconUrl;

    const place = document.getElementById('place');
    place.innerHTML = `<h1>${descrip}</h1>`;

    const graph = document.getElementById('graph');
    graph.innerHTML =  `<p>Max : ${data['main']['temp_max']}  🢁</p>
                        <p>Min : ${data['main']['temp_min']}  🢃</p>
                        <h2>Temperature</h2>`;
                                         
    document.getElementById('icon').appendChild(iconImage);

  })
};

/*-----------------------------------------------------------------------------------------------*/

function locate(){if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    newlocate(latitude,longitude);

  }, function(error) {

    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  });
} else {
  alert("Geolocation is not available in this browser");
}};

/*-----------------------------------------------------------------------------------------------*/

function newlocate( lat, long) {
fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=3045dd712ffe6e702e3245525ac7fa38&lang=en&units=metric')
.then(res => res.json())
.then(data => 
{
  var nameval = data['name']
  var descrip = data['weather']['0']['description']
  var wndspd = data['wind']['speed']
  var pressure = data['main']['pressure']
  var humidity = data['main']['humidity']
  var clouds = data['clouds']['all']
  var visibility = data['visibility']
  
  document.getElementById('desc').innerHTML = `<h1>${nameval}</h1>
                                               <p>Wind Speed : ${wndspd} m/s</p>
                                               <p>Pressure : ${pressure} hPa</p>
                                               <p>Humidity : ${humidity} %</p>
                                               <p>Cloudiness : ${clouds} %</p>
                                               <p>Visibility : ${visibility} m</p>`
  

  const iconCode = data.weather[0].icon;
  const iconUrl = `weather/${iconCode}.png`;
                                       
  const iconImage = document.getElementById('img');
  iconImage.src = iconUrl;

  const place = document.getElementById('place');
  place.innerHTML = `<h1>${descrip}</h1>`;

  const graph = document.getElementById('graph');
  graph.innerHTML =  `<p>Max : ${data['main']['temp_max']}  🢁</p>
                        <p>Min : ${data['main']['temp_min']}  🢃</p>
                        <h2>Temperature</h2>`;
                                       
  document.getElementById('icon').appendChild(iconImage);

  new1(nameval);
})

};

/*-----------------------------------------------------------------------------------------------*/

const divisionIds = ['New York', 'San Fransisco', 'New Delhi', 'Tokyo' , 'Washington DC', 'Maldives', 'Toronto'];

const container = document.getElementById('two'); 

for (let i = 0; i < divisionIds.length; i++) {
  const divisionId = divisionIds[i];
  
  const division = document.createElement('div');
  
  division.id = divisionId;
  
  division.textContent = divisionIds[i];
  
  container.appendChild(division);
  search(divisionIds[i]);
}

/*-----------------------------------------------------------------------------------------------*/

function convert(val)
{
   var x = parseInt(val - 273);
   return x;
}

/*-----------------------------------------------------------------------------------------------*/

function search(value)
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+value+'&appid=3045dd712ffe6e702e3245525ac7fa38')
  .then(res => res.json())

  .then(data => 
  {
    var tempature = data['main']['temp']
    var time = data['timezone']
    document.getElementById(value).innerHTML = `<h1>${ convert(tempature)}°<h6>${value}</h6>${timecon(time)} GST</h1>`

  })
}

/*-----------------------------------------------------------------------------------------------*/

apik = '3045dd712ffe6e702e3245525ac7fa38'

/*-----------------------------------------------------------------------------------------------*/

var btn = document.getElementById('btn');
var inputval = document.getElementById('inputval');

inputval.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});

/*-----------------------------------------------------------------------------------------------*/

btn.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik+'&units=metric')
  .then(res => res.json())


  .then(data => 
  {
    var nameval = data['name']
    var descrip = data['weather']['0']['description']
    var wndspd = data['wind']['speed']
    var pressure = data['main']['pressure']
    var humidity = data['main']['humidity']
    var clouds = data['clouds']['all']
    var visibility = data['visibility']
    
    document.getElementById('desc').innerHTML = `<h1>${nameval}</h1>
                                                 <p>Wind Speed : ${wndspd} m/s</p>
                                                 <p>Pressure : ${pressure} hPa</p>
                                                 <p>Humidity : ${humidity} %</p>
                                                 <p>Cloudiness : ${clouds} %</p>
                                                 <p>Visibility : ${visibility} m</p>`

    const iconCode = data.weather[0].icon;
    const iconUrl = `weather/${iconCode}.png`;
                                                                                      
    const iconImage = document.getElementById('img');
    iconImage.src = iconUrl;

    const place = document.getElementById('place');
    place.innerHTML = `<h1>${descrip}</h1>`;

    const graph = document.getElementById('graph');
    graph.innerHTML =  `<p>Max : ${data['main']['temp_max']}  🢁</p>
                        <p>Min : ${data['main']['temp_min']}  🢃</p>
                        <h2>Temperature</h2>`;
                                                                                      
    document.getElementById('icon').appendChild(iconImage);

  })

  .catch(err => alert('You entered Wrong city name'))
  
});

/*-----------------------------------------------------------------------------------------------*/

const apiKey = '3045dd712ffe6e702e3245525ac7fa38';

btn.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputval.value+'&appid='+apiKey+'&units=metric')
  .then(response => response.json())
  .then(data => {
    const forecastList = data.list;
    
    document.getElementById('del').innerHTML = '';

    const div = document.createElement('div');
    div.id = 'two2';
    document.getElementById('del').appendChild(div);

    forecastList.forEach(forecast => {
      const forecastDateTime = new Date(forecast.dt * 1000); 
      const forecastDate = forecastDateTime.toDateString();
      const forecastTime = forecastDateTime.toLocaleTimeString();
      if(forecastTime == '2:30:00 PM'){
      const temperature = forecast.main.temp;
      const weatherDescription = forecast.weather[0].description;

      const forecastElement = document.createElement('div');

      forecastElement.innerHTML = `<h1>${parseInt(temperature)}°<h6>${forecastDate}</h6>${weatherDescription}</h1>`;

      const forecastContainer = document.getElementById('two2');
      forecastContainer.appendChild(forecastElement);
      }
    });
  })
  .catch(error => {
    console.log("Error fetching forecast data: " + error);
  });
});


/*-----------------------------------------------------------------------------------------------*/

function new1(x){
  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+x+'&appid='+apiKey+'&units=metric')
    .then(response => response.json())
    .then(data => {
      const forecastList = data.list;
      
      document.getElementById('del').innerHTML = '';
  
      const div = document.createElement('div');
      div.id = 'two2';
      document.getElementById('del').appendChild(div);

  
      forecastList.forEach(forecast => {
        const forecastDateTime = new Date(forecast.dt * 1000);
        const forecastDate = forecastDateTime.toDateString();
        const forecastTime = forecastDateTime.toLocaleTimeString();
        if(forecastTime == '2:30:00 PM'){
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;
  
        const forecastElement = document.createElement('div');

        forecastElement.innerHTML = `<h1>${parseInt(temperature)}°<h6>${forecastDate}</h6>${weatherDescription}</h1>`;
  
        const forecastContainer = document.getElementById('two2');
        forecastContainer.appendChild(forecastElement);
        }
      });
    })
    .catch(error => {
      console.log("Error fetching forecast data: " + error);
    });
  }


  

    