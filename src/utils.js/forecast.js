const axios = require("axios");

const forecast = (lat, long, cb) => {
  const url = `https://api.darksky.net/forecast/7b3c356883d65f6efcbe83f17502d90e/${lat},${long}?units=si`;

  axios
    .get(url)
    .then(res => {
      cb(undefined, {
        lat: res.features[0].center[1],
        long: res.features[0].center[0],
        location: res.features[0].place_name
      });
    })
    .catch(err => cb("Unable to connect to location services.", undefined));
};

module.exports = forecast;
