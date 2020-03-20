const form = document.querySelector("form");
const weather = document.querySelector("#weather");

console.log("Hi");

form.addEventListener("submit", e => {
  e.preventDefault();
  let addr = form.address;
  if (addr.value != "") {
    fetch(`http://localhost:3000/weather?address=${addr.value}`).then(res => {
      res.json().then(data => {
        weather.innerHTML = `There is <b>${data.temp}</b> in <b>${data.location}</b>`;
      });
    });
  } else {
    alert("Please Provide address.");
  }
});
