const chalk = require('chalk');
const request = require('request');

require('dotenv').config();

const URL = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=Beirut`;
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Beirut%2C%20Lebanon.json?limit=1&access_token=${process.env.MB_ACCESS_TOKEN}`;

// Weather Forecast
request({ uri: URL, json: true }, (error, response, body) => {
    if (body.error) {
        console.log(chalk.red('Error:\n'), body);
        return false;
    }

    console.log(body.current);
});

// Geocoding
request({ uri: geocodeURL, json: true }, (error, response, body) => {
    if (body.error) {
        console.log(chalk.red('Error:\n'), body);
        return false;
    }

    const lat = body.features[0].center[1];
    const long = body.features[0].center[0];
});
