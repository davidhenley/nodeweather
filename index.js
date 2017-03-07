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
