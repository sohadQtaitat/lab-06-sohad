'use strict';



require('dotenv').config();
//Dependencies
const cors  = require('cors');
const express = require('express');

//Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

//////////////////////////////////////////////////------------ Routes ------------/////////////////////////////Sohad/



/////////////////////////////////////////////////------------Location-------------/////////////////////////////sohad/

app.get('/location', (request, response) => {

  try {
    const dataLocation = locationHelper(request.query.data);
    response.send(dataLocation);
  }
  catch (error) {
    console.log(error);
    response.status(500).send('Status: 500...something went wrong :('); }});



/////////////////////////////////////////////////------------Helper Function-------------/////////////////////////////Sohad/


function locationHelper(query) {

 
  const dataGeo =require('./data/geo.json');

  const location = {

    search_query: query,
    formatted_query: dataGeo.results[0].formatted_address,
    latitude: dataGeo.results[0].geometry.location.lat,
    longitude: dataGeo.results[0].geometry.location.lng

  };

  return location;
}



/////////////////////////////////////////////////------------Weather-------------/////////////////////////////Sohad/


app.get('/weather', (request, response) => {


  try {
    const dataWeather = searchWeather(request.query.data);

    response.send(dataWeather);
  }

  catch (error) {
    console.log(error);
    response.status(500).send('Status: 500...something went wrong :(');
  }
});





/////////////////////////////////////////////////------------Helper Function-------------/////////////////////////////Sohad/

function searchWeather(query) {
  const darkSky =require('./data/darksky.json');

  let weather = {
    search_query: query,
    latitude: darkSky.latitude,
    longitude: darkSky.longitude,
    time: darkSky.currently.time,
    summary: darkSky.currently.summary

  };
  return weather;
}




/////////////////////////////////////////////////-----------Error------------/////////////////////////////Sohad/




app.get('/foo',(request,response) =>{
    throw new Error('ops');
})

app.use('*', (request, response) => {
    response.status(404).send('Not Found')
})

app.use((error,request,response) => {
    response.status(500).send(error)
})

/////////////////////////////////////////////////-----------listening for requests------------/////////////////////////////Sohad/

 
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
