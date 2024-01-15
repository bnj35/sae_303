import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// import json data
import data2020 from "../json/mmi2020.json" assert { type: "json" };
import data2021 from "../json/mmi2021.json" assert { type: "json" };
import data2022 from "../json/mmi2022.json" assert { type: "json" };
console.log(data2020);
console.log(data2021);
console.log(data2022);

// calculate average of the three data sets
let sumg2020 = 0;
let sumt2020 = 0;
let sump2020 = 0;
for (let i = 0; i < data2020.length; i++) {
  sumg2020 += data2020[i].taux_adm_psup_gen;
  sumt2020 += data2020[i].taux_adm_psup_techno;
  sump2020 += data2020[i].taux_adm_psup_pro;
}

const mbacg = Math.round(sumg2020 / data2020.length);
const mbact = Math.round(sumt2020 / data2020.length);
const mbacp = Math.round(sump2020 / data2020.length);

let sumg2021 = 0;
let sumt2021 = 0;
let sump2021 = 0;
for (let i = 0; i < data2021.length; i++) {
  sumg2021 += data2021[i].taux_adm_psup_gen;
  sumt2021 += data2021[i].taux_adm_psup_techno;
  sump2021 += data2021[i].taux_adm_psup_pro;
}
const mbacg2 = Math.round(sumg2021 / data2021.length);
const mbact2 = Math.round(sumt2021 / data2021.length);
const mbacp2 = Math.round(sump2021 / data2021.length);

let sumg2022 = 0;
let sumt2022 = 0;
let sump2022 = 0;
for (let i = 0; i < data2022.length; i++) {
  sumg2022 += data2022[i].part_acces_gen;
  sumt2022 += data2022[i].part_acces_tec;
  sump2022 += data2022[i].part_acces_pro;
}
const mbacg3 = Math.round(sumg2022 / data2022.length);
const mbact3 = Math.round(sumt2022 / data2022.length);
const mbacp3 = Math.round(sump2022 / data2022.length);

console.log(mbacg);
console.log(mbact);
console.log(mbacp);
console.log(mbacg2);
console.log(mbact2);
console.log(mbacp2);
console.log(mbacg3);
console.log(mbact3);
console.log(mbacp3);

// set the dimensions and margins of the graph
const width = 500,
  height = 500,
  margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'mcamembert'
const svg = d3
  .select("#camembert")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

// create 2 data_set
const data1 = { Général: mbacg, Techno: mbact, Pro: mbacp };
const data2 = { Général: mbacg2, Techno: mbact2, Pro: mbacp2 };
const data3 = { Général: mbacg3, Techno: mbact3, Pro: mbacp3 };

// set the color scale
const color = d3
  .scaleOrdinal()
  .domain(["Général", "Techno", "Pro"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {
  // Compute the position of each group on the pie:
  const pie = d3
    .pie()
    .value(function (d) {
      return d[1];
    })
    .sort(function (a, b) {
      return d3.ascending(a.key, b.key);
    }); // This make sure that group order remains the same in the pie chart
  const data_ready = pie(Object.entries(data));

  // map to data
  const u = svg.selectAll("path").data(data_ready);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u.join("path")
    .transition()
    .duration(1000)
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", function (d) {
      return color(d.data[0]);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);
}

// Initialize the plot with the first dataset
update(data1);

document.getElementById("data1Button").addEventListener("click", () => {
  update(data1);
});
document.getElementById("data2Button").addEventListener("click", () => {
  update(data2);
});
document.getElementById("data3Button").addEventListener("click", () => {
  update(data3);
});

const legendKeys = ["Général", "Techno", "Pro"];

const legendSvg = d3
  .select("#legend")
  .append("svg")
  .attr("width", 150)
  .attr("height", legendKeys.length * 20);

legendSvg
  .selectAll("legendRect")
  .data(legendKeys)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * 20)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", (d, i) => color(d));

legendSvg
  .selectAll("legendLabel")
  .data(legendKeys)
  .enter()
  .append("text")
  .attr("x", 20)
  .attr("y", (d, i) => i * 20 + 10)
  .text((d) => d)
  .style("alignment-baseline", "middle");
