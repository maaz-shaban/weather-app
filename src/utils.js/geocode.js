const axios = require("axios");

const geocode = (addr, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1IjoibXVhejIyIiwiYSI6ImNrN2l4azMxZjBsZGMzZnBla3o1c2VtZWMifQ.oN0A9zKQBq0zU2-ghRhGdQ`;

  axios
    .get(url)
    .then(res => {
      // cb(undefined, {
      //   lat: res.features[0].center[1],
      //   long: res.features[0].center[0],
      //   location: res.features[0].place_name
      // });
      cb(undefined, res.body);
    })
    .catch(err => cb("Unable to connect to location services.", undefined));
};

module.exports = geocode;
