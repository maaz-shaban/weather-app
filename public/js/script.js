const form = document.querySelector("form");
const weather = document.querySelector("#weather");
const btn = document.querySelector("#btn");

form.addEventListener("submit", e => {
  e.preventDefault();
  btn.setAttribute("disabled", true);
  let addr = form.address;
  if (addr.value != "") {
    fetch(`/weather?address=${addr.value}`).then(res => {
      res.json().then(data => {
        console.log(data);
        if (data.err != undefined) {
          btn.removeAttribute("disabled");
          weather.classList.add("error");
          weather.innerHTML = `ERROR: ${data.err}`;
        } else {
          data = data.data;
          btn.removeAttribute("disabled");
          weather.classList.remove("error");
          weather.innerHTML = `<b>Location: </b> <span>${data.location}</span><br>
                              <b>Weather Summary: </b> <span></span>${data.summary}<br>
                              <b>Temprature: </b> <span>${data.temp} C</span> <br>
                              There is <b>${data.rain}%</b> chance of rain today.`;
        }
      });
    });
  } else {
    btn.removeAttribute("disabled");
    weather.classList.add("error");
    weather.innerHTML = `ERROR: Please provide address`;
  }
});
