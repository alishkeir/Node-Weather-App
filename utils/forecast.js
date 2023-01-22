const request = require('request');

const forecast = (lat, long, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${lat},${long}`;

    request({ uri: forecastURL, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            switch (body.error.type) {
                case 'invalid_access_key':
                    callback('Invalid WeatherStack API Key!');
                    break;
                case 'missing_query':
                    callback('The given location is not valid!');
                    break;
                default:
                    callback('Something went wrong!');
                    break;
            }
        } else {
            callback(null, body.current);
        }
    });
};

module.exports = forecast;
