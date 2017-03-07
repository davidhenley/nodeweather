const request = require('request');

request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=7337%20cockrill%20bend%20blvd%20nashville%20tn%2037209`,
  json: true
}, (err, res, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
