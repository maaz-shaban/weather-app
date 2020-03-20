const form = document.querySelector("form");
const weather = document.querySelector("#weather");
const btn = document.querySelector("#btn");

form.addEventListener("submit", e => {
  e.preventDefault();
  btn.setAttribute("disabled", true);
  weather.innerHTML = "Loading...";
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
          weather.innerHTML = `<span>${data.location}</span><br>
                              <span>${data.summary}</span><br>
                              <span>${data.temp} C</span> <br>
                              <span>There is <b>${data.rain}%</b> chance of rain today.</span>`;
        }
      });
    });
  } else {
    btn.removeAttribute("disabled");
    weather.classList.add("error");
    weather.innerHTML = `ERROR: Please provide address`;
  }
});
