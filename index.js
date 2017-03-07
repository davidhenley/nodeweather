const request = require('request');
const yargs = require('yargs');

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

const address = encodeURIComponent(argv.address);

request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (err, res, body) => {
  if (err) console.log('Error fetching results.');
  else if (body.status === 'ZERO_RESULTS') console.log('No results found.');
  else if (body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
});
