const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
  else {
    console.log(res.address);
    weather.getWeather(res.latitude, res.longitude, (err, res) => {
      if (err) console.log(err);
      else console.log(`It's currently ${res.temperature}. It feels like ${res.apparentTemperature}.`)
    });
  }
});
