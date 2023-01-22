const chalk = require('chalk');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

require('dotenv').config();

const address = process.argv[2];

if (address) {
    geocode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            console.log(chalk.red(`Error: ${error}`));
            return;
        }

        console.log('\n', chalk.cyan(location));

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                console.log(chalk.red(`Error: ${error}`));
                return;
            }

            console.log(forecastData);
        });
    });
} else {
    console.log(
        '\n',
        chalk.red('Please provide an address in the arguments, ex:'),
        chalk.magenta('"node app.js London"')
    );
}
