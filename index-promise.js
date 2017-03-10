const yargs = require('yargs');
const axios = require('axios');

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

const ENCODED_ADDRESS = encodeURIComponent(argv.address);
const GEOCODE_URL = `http://maps.googleapis.com/maps/api/geocode/json?address=${ENCODED_ADDRESS}`;
const API_KEY = 'd3c0b04e02707d2c3d8f0caa454f7cc0';

axios.get(GEOCODE_URL)
  .then(({ data }) => {
    if (data.status === 'ZERO_RESULTS') throw new Error('Unable to find that address');

    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    const WEATHER_URL = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;

    console.log(data.results[0].formatted_address);
    return axios.get(WEATHER_URL);
  })
  .then(({ data }) => {
    const temp = data.currently.temperature;
    const appTemp = data.currently.apparentTemperature;
    console.log(`It's currently ${temp}. It feels like ${appTemp}`);
  })
  .catch(err => {
    if (err.code === 'ENOTFOUND') console.log('Could not connect to API servers.');
    else console.log(err.message);
  });
