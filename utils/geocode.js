const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?limit=1&access_token=${process.env.MB_ACCESS_TOKEN}`;

    request({ uri: geocodeURL, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body?.features?.length === 0) {
            callback('The given location is not valid, try another location!');
        } else {
            callback(null, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].matching_place_name
                    ? body.features[0].matching_place_name
                    : body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
