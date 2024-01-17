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

let sumF2021 = 0;
let sumH2021 = 0;
for (let i = 0; i < data2021.length; i++) {
  sumF2021 += data2021[i].pct_f;
  sumH2021 += 100 - data2021[i].pct_f;
}
sumF2021 = Math.round(sumF2021 / data2021.length / 10);
sumH2021 = Math.round(sumH2021 / data2021.length / 10);
console.log(sumF2021);
console.log(sumH2021);

let sumF2020 = 0;
let sumH2020 = 0;
for (let i = 0; i < data2020.length; i++) {
  sumF2020 += data2020[i].pct_f;
  sumH2020 += 100 - data2020[i].pct_f;
}
sumF2020 = Math.round(sumF2020 / data2020.length / 10);
sumH2020 = Math.round(sumH2020 / data2020.length / 10);
console.log(sumF2020);
console.log(sumH2020);


let textf = document.getElementById("pct_f");
let texth = document.getElementById("pct_h");
textf.innerHTML= textf.innerHTML+(sumF2022+"0"+" %");
texth.innerHTML= texth.innerHTML+(sumH2022+"0"+" %");


let fm = document.getElementById("femme");
for (let i = 0; i < sumF2022; i++) {
  let img= document.createElement('img');
  img.src = '../img/femme.svg';
  img.width = 100-1*sumF2022;
  fm.appendChild(img);
};
//ça marche
let hm = document.getElementById("homme");
for (let i = 0; i < sumH2022; i++) {
  let img2= document.createElement('img');
  img2.src = '../img/homme.svg';
  img2.width = 100-1*sumH2022;
  hm.appendChild(img2);
};

let but20 = document.getElementById("but2020");
let but21 = document.getElementById("but2021");
let but22 = document.getElementById("but2022");

but22.addEventListener("click", function() {
  let fm = document.getElementById("femme");
  let hm = document.getElementById("homme");
  while (fm.firstChild) {
    fm.removeChild(fm.firstChild);
}; 
while (hm.firstChild) {
  hm.removeChild(hm.firstChild);
}; 


textf.innerHTML=(sumF2022+"0"+" %");
texth.innerHTML= (sumH2022+"0"+" %");
  
  for (let i = 0; i < sumF2022; i++) {
    let img= document.createElement('img');
    img.src = '../img/femme.svg';
    img.width = 100-1*sumF2022;
    fm.appendChild(img);
  };
  fm.classList.remove('scale-up-center'); 
  void fm.offsetWidth; 
  fm.classList.add('scale-up-center');
  //ça marche
  
  for (let i = 0; i < sumH2022; i++) {
    let img2= document.createElement('img');
    img2.src = '../img/homme.svg';
    img2.width = 100-1*sumH2022;
    hm.appendChild(img2);
  };
  hm.classList.remove('scale-up-center'); 
  void hm.offsetWidth; 
  hm.classList.add('scale-up-center');
  
});

but21.addEventListener("click", function() {
  let fm = document.getElementById("femme");
  let hm = document.getElementById("homme");
  while (fm.firstChild) {
    fm.removeChild(fm.firstChild);
}; 
while (hm.firstChild) {
  hm.removeChild(hm.firstChild);
}; 


textf.innerHTML=(sumF2021+"0"+" %");
texth.innerHTML= (sumH2021+"0"+" %");
  
  for (let i = 0; i < sumF2021; i++) {
    let img= document.createElement('img');
    img.src = '../img/femme.svg';
    img.width = 100-1*sumF2021;
    fm.appendChild(img);
  };
  fm.classList.remove('scale-up-center'); 
  void fm.offsetWidth; 
  fm.classList.add('scale-up-center');
  //ça marche
  
  for (let i = 0; i < sumH2021; i++) {
    let img2= document.createElement('img');
    img2.src = '../img/homme.svg';
    img2.width = 100-1*sumH2021;
    hm.appendChild(img2);
  };
  hm.classList.remove('scale-up-center'); 
  void hm.offsetWidth; 
  hm.classList.add('scale-up-center');
  
});

but20.addEventListener("click", function() {
  let fm = document.getElementById("femme");
  let hm = document.getElementById("homme");
  while (fm.firstChild) {
    fm.removeChild(fm.firstChild);
}; 
while (hm.firstChild) {
  hm.removeChild(hm.firstChild);
}; 


textf.innerHTML=(sumF2020+"0"+" %");
texth.innerHTML= (sumH2020+"0"+" %");
  
  for (let i = 0; i < sumF2020; i++) {
    let img= document.createElement('img');
    img.src = '../img/femme.svg';
    img.width = 100-1*sumF2020;
    fm.appendChild(img);
  };
  fm.classList.remove('scale-up-center'); 
  void fm.offsetWidth; 
  fm.classList.add('scale-up-center');
  //ça marche
  
  for (let i = 0; i < sumH2020; i++) {
    let img2= document.createElement('img');
    img2.src = '../img/homme.svg';
    img2.width = 100-1*sumH2020;
    hm.appendChild(img2);
  };
  hm.classList.remove('scale-up-center'); 
  void hm.offsetWidth; 
  hm.classList.add('scale-up-center');
  
});