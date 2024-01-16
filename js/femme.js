var button = document.getElementById("mode");

document.addEventListener("DOMContentLoaded", () => {
  let theme = localStorage.getItem("theme") || false;
  if (!theme)
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : false;
  if (theme) document.documentElement.setAttribute("data-theme", theme);
  document.body.style.visibility = "visible";
  document.body.style.opacity = 1;
});

button.onclick = () => {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

document.addEventListener("DOMContentLoaded", () => {
  let theme = localStorage.getItem("theme") || false;
  if (!theme)
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : false;
  if (theme) document.documentElement.setAttribute("data-theme", theme);
});

var toggle = document.getElementById("toggle");

toggle.addEventListener("click", function () {
  this.classList.toggle("active");

  var overlay = document.getElementById("overlay");
  overlay.classList.toggle("open");
});

// hybride
import data2020 from "../json/mmi2020.json" assert { type: "json" };
import data2021 from "../json/mmi2021.json" assert { type: "json" };
import data2022 from "../json/mmi2022.json" assert { type: "json" };
//calcutate average of women and men accepted in 2022
let sumF2022 = 0;
let sumH2022 = 0;
for (let i = 0; i < data2022.length; i++) {
  sumF2022 += data2022[i].pct_f;
  sumH2022 += 100 - data2022[i].pct_f;
}
sumF2022 = Math.round(sumF2022 / data2022.length / 10);
sumH2022 = Math.round(sumH2022 / data2022.length / 10);
console.log(sumF2022);
console.log(sumH2022);

let fm = document.getElementById("femme");
let textf = document.getElementById("pct_f");
let texth = document.getElementById("pct_h");

textf.innerHTML= textf.innerHTML+(sumF2022+"0"+" %");
texth.innerHTML= texth.innerHTML+(sumH2022+"0"+" %");
fm.innerhtml = fm.innerhtml+("test");
for (let i = 0; i < sumF2022.length; i++) {
  fm.innerhtml = fm.innerhtml;
};

let sumF2020 = 0;
let sumH2020 = 0;
for (let i = 0; i < data2022.length; i++) {
  sumF2020 += data2020[i].pct_f;
  sumH2020 += 100 - data2020[i].pct_f;
}
sumF2020 = Math.round(sumF2020 / data2020.length / 10);
sumH2020 = Math.round(sumH2020 / data2020.length / 10);
console.log(sumF2020);
console.log(sumH2020);
