const chalk = require('chalk');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

require('dotenv').config();

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Weather App',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Not Found',
        errorMessage: 'Page not found.',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
