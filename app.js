const chalk = require('chalk');
const request = require('request');
const geocode = require('./utils/geocode');

require('dotenv').config();

const URL = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=Beirut`;
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Beirut.json?limit=1&access_token=${process.env.MB_ACCESS_TOKEN}`;

// // Weather Forecast
// request({ uri: URL, json: true }, (error, response, body) => {
//     if (error?.errno === -3008) {
//         console.log(chalk.red('Please check your Internet Connection!'));
//         return false;
//     }
//     if (body?.error) {
//         switch (body.error.type) {
//             case 'invalid_access_key':
//                 console.log(chalk.red('Invalid API Key'));
//                 break;
//             case 'missing_query':
//                 console.log(chalk.red('The given location is not valid'));
//                 break;

//             default:
//                 console.log(chalk.red('Error:\n'), body);
//                 break;
//         }

//         return false;
//     }

//     console.log(body.current);
// });

// // Geocoding;
// request({ uri: geocodeURL, json: true }, (error, response, body) => {
//     let lat = '';
//     let long = '';

//     if (error?.errno === -3008) {
//         console.log(chalk.red('Please check your Internet Connection!'));
//         return false;
//     }

//     if (body?.error) {
//         console.log(chalk.red('Error:\n'), error);
//         return false;
//     }

//     if (!body.query) {
//         console.log(chalk.red(body.message));
//         return false;
//     }

//     if (!body.query?.length) {
//         console.log(chalk.red('The given location is not valid'));
//         return false;
//     }

//     if (body?.features?.length) {
//         if (body?.features[0]?.center) {
//             lat = body?.features[0]?.center[1];
//             long = body?.features[0]?.center[0];
//         }
//     }
// });

geocode('Beirut', (error, data) => {
    console.log(error);
    console.log(data);
});
