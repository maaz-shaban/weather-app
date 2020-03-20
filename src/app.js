const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils.js/geocode");
const forecast = require("./utils.js/forecast");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Maaz Shaban" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Maaz Shaban" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help Page", name: "Maaz Shaban" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You have to provide address." });
  }

  geocode(req.query.address, (err, body) => {
    if (err != undefined) {
      return res.send({
        err: "Unable to connect to location service.",
        data: undefined
      });
    }

    forecast(body.lat, body.long, (err1, data) => {
      if (err1 != undefined) {
        return res.send({
          err: "Unable to connect to location service.",
          data: undefined
        });
      }

      return res.send({
        err: undefined,
        data: {
          temp: data.temp,
          summary: data.summary,
          rain: data.precip,
          location: body.location
        }
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running on port " + PORT + "."));
