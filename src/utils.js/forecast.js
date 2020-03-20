const axios = require("axios");

const forecast = (lat, long, cb) => {
  const url = `https://api.darksky.net/forecast/7b3c356883d65f6efcbe83f17502d90e/${lat},${long}?units=si`;

  axios
    .get(url)
    .then(res => {
      cb(undefined, {
        temp: res.data.currently.temperature,
        summary: res.data.currently.summary,
        precip: res.data.currently.precipProbability
      });
    })
    .catch(err => cb("Unable to connect to location services.", undefined));
};

module.exports = forecast;
