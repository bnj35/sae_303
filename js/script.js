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

//menu

var toggle = document.getElementById("toggle");

toggle.addEventListener("click", function () {
  this.classList.toggle("active");

  var overlay = document.getElementById("overlay");
  overlay.classList.toggle("open");

  var tab = document.getElementById("table");
  tab.classList.toggle("active");
});
