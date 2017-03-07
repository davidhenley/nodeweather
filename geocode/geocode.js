const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Error fetching results.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('No results found.');
    } else if (body.status === 'OK') {
      callback(null, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
