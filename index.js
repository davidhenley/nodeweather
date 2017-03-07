/*
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const { argv } = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h');

geocode.geocodeAddress(argv.address, (err, res) => {
  if (err) console.log(err);
  else console.log(JSON.stringify(res, null, 2));
});
*/

// d3c0b04e02707d2c3d8f0caa454f7cc0
// https://api.darksky.net/forecast/API_KEY/LATITUDE,LONGITUDE

const request = require('request');

const API_KEY = 'd3c0b04e02707d2c3d8f0caa454f7cc0';
const LATITUDE = '36.0923299';
const LONGITUDE = '-86.80333';
const ROOT_URL = `https://api.darksky.net/forecast/${API_KEY}/${LATITUDE},${LONGITUDE}`;

request({
  url: ROOT_URL,
  json: true
}, (err, res, body) => {
  if (!err && res.statusCode === 200) console.log(body.currently.temperature);
  else console.log('Unable to fetch weather');
});
