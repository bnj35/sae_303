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
