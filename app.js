require('dotenv').config();

const request = require('postman-request');

const API_KEY = process.env.WS_API_KEY ? process.env.WS_API_KEY : '';
const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=New%20York`;

request(URL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});

console.log(process.env.WS_API_KEY);
