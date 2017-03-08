const request = require('request');

const API_KEY = 'd3c0b04e02707d2c3d8f0caa454f7cc0';

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) callback(null, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
    else callback('Unable to fetch weather');
  });
};

module.exports = {
  getWeather
};
