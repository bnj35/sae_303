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

var div = d3.select("body").append("div").attr("class", "toolTip");

// create 2 data_set
const data1 = { Général: mbacg, Techno: mbact, Pro: mbacp };
const data2 = { Général: mbacg2, Techno: mbact2, Pro: mbacp2 };
const data3 = { Général: mbacg3, Techno: mbact3, Pro: mbacp3 };

// set the color scale
const primarycolor = "var(--primary)";
const secondarycolor = "var(--secondary)";
const accentcolor = "var(--accent)";

const color = d3
  .scaleOrdinal()
  .domain(["Général", "Techno", "Pro"])
  .range([primarycolor, secondarycolor, accentcolor]);

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
    });

  const data_ready = pie(Object.entries(data));

  // Update the pie chart paths
  const paths = svg.selectAll("path").data(data_ready);

  // Handle the exit selection
  paths.exit().remove();

  // Handle the enter and update selections
  paths
    .enter()
    .append("path")
    .merge(paths)
    .transition() // Apply a transition
    .duration(1000) // Duration of the transition
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", function (d) {
      return color(d.data[0]);
    })
    .attr("stroke", "var(--background)")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  // Re-select all paths to apply the tooltip functionality
  svg
    .selectAll("path")
    .on("mousemove", function (event, d) {
      // Get the bounding rectangle of the SVG container
      const svgRect = svg.node().getBoundingClientRect();

      // Calculate the position of the tooltip based on event coordinates and the SVG position
      const tooltipX = event.pageX;
      const tooltipY = event.pageY;

      // Adjust the position of the tooltip so it's not directly under the mouse cursor
      const offsetX = 20; // horizontal offset
      const offsetY = -25; // vertical offset

      div.style("left", tooltipX + offsetX + "px");
      div.style("top", tooltipY + offsetY + "px");
      div.style("display", "inline-block");
      div.html(d.data[0] + "<br>" + d.data[1] + pourcentage);
    })
    .on("mouseout", function () {
      div.style("display", "none");
    });

  // Remove previous text elements
  svg.selectAll("text").remove();

  // Define labelArc
  var labelArc = d3
    .arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  // Add the text labels

  const pourcentage = " %";
  /* const text = svg
    .selectAll("text")
    .data(data_ready)
    .enter()
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + labelArc.centroid(d) + ")";
    })
    .attr("dy", "0.35em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text(function (d) {
      return d.data[0];
    });*/
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

//table

let gridData = [];

for (let i = 0; i < data2022.length; i++) {
  let g_ea_lib_vx = data2022[i]["g_ea_lib_vx"];
  let part_acces_gen =
    data2022[i]["part_acces_gen"] != null
      ? data2022[i]["part_acces_gen"].toString() + "%"
      : "0%";
  let part_acces_tec =
    data2022[i]["part_acces_tec"] != null
      ? data2022[i]["part_acces_tec"].toString() + "%"
      : "0%";
  let part_acces_pro =
    data2022[i]["part_acces_pro"] != null
      ? data2022[i]["part_acces_pro"].toString() + "%"
      : "0%";
  let session = data2022[i]["session"];

  gridData.push([
    g_ea_lib_vx,
    part_acces_gen,
    part_acces_tec,
    part_acces_pro,
    session,
  ]);
}

let allData = data2020.concat(data2021);

for (let i = 0; i < allData.length; i++) {
  let g_ea_lib_vx = allData[i]["g_ea_lib_vx"];
  let part_acces_gen =
    allData[i]["taux_adm_psup_gen"] != null
      ? allData[i]["taux_adm_psup_gen"].toString() + "%"
      : "0%";
  let part_acces_tec =
    allData[i]["taux_adm_psup_techno"] != null
      ? allData[i]["taux_adm_psup_techno"].toString() + "%"
      : "0%";
  let part_acces_pro =
    allData[i]["taux_adm_psup_pro"] != null
      ? allData[i]["taux_adm_psup_pro"].toString() + "%"
      : "0%";
  let session = allData[i]["session"];

  gridData.push([
    g_ea_lib_vx,
    part_acces_gen,
    part_acces_tec,
    part_acces_pro,
    session,
  ]);
}

console.log(gridData);

new gridjs.Grid({
  columns: [
    "IUT",
    "Part de bac Général",
    "Part de bac Technologique",
    "Part de bac Profesionnel",
    "Année",
  ],
  data: gridData,
  style: {
    td: {
      border: "1px solid #ccc",
    },
    table: {
      "font-size": "15px",
      "text-align": "center",
      "font-family": "Poppins",
      color: "var(--text)",
      "background-color": "var(--background)",
      "z-index": "0",
    },
  },
  language: {
    search: {
      placeholder: "Rechercher...",
    },
    sort: {
      sortAsc: "Sort column ascending",
      sortDesc: "Sort column descending",
    },
    pagination: {
      previous: "Précédent",
      next: "Suivant",
      showing: "Affichage des résultats",
      of: "sur",
      to: "à",
      results: "résultats",
    },
    loading: "Chargement.",
    noRecordsFound: "Aucun résultats trouvé",
    error: "Une erreur est apparu lors de la récupération des données",
  },
  search: true,
  pagination: {
    limit: 8,
  },
  sort: true,
}).render(document.getElementById("table"));
