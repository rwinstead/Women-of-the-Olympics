var mapNodePoint;
var boundaryMap;

var currentYear = '1948';
var path;

function updateWorldMap(year){

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 1000 - margin.left - margin.right,
                height = 640 - margin.top - margin.bottom;



    path = d3.geoPath();

    mapNodePoint = d3.select('#staticCanvasSVG')
                svg.append('g')
                .attr('id', 'mapAllId');

    var projection = d3.geoMercator()
                       .scale(130)
                      .translate( [width / 2, height / 1.5]);

    path = d3.geoPath().projection(projection);

    // mapNodePoint.call(tip);

    currentYear = year;

    queue()
        .defer(d3.json, "vizFiles/5worldMap/world_countries.json")
        .defer(d3.tsv, "vizFiles/5worldMap/country_participation.tsv")
        .await(ready);

}


function ready(error, data, population) {

var max = d3.max(population, d => parseInt(d[currentYear]));
//console.log(data['features'][0]);
console.log(population);

  var Tooltip = d3.select("#staticCanvas")
    .append("div")
    .attr("id", 'worldMapTooltip')
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "#333333")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style('color','#BFFF21')
    .style("position", "absolute")
    .style("z-index", "10")

  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      //.style("stroke", "black")
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    var format = d3.format(",");
    Tooltip
      .html("<strong>Country: </strong><span class='details'>" + d.id + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>")
      .style("left", (d3.mouse(this)[0]) + "px")
      .style("top", d3.event.clientY-80 + "px") //(d3.mouse(this)[1])
  }

  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      //.style("stroke", "none")
      .style("opacity", 0.8)
  }




  var populationById = {};
  var maxParticipation = 0;

  population.forEach(function(d) {
      // console.log(d['2016']);
      if (d[currentYear] > maxParticipation){
          maxParticipation = d[currentYear];
      }
  });


  // var colorScale = d3.scaleLinear().domain([0,200]).range(["#BFFF21", "#004FE9"]);
  // var colorScale = d3.scaleLinear().domain([0,maxParticipation]).range(["#111111", "#BFFF21"]);
  var colorScale = d3.scaleLinear().domain([0,240]).range(["#111111", "#BFFF21"]);


  population.forEach(function(d) { populationById[d.id] = +d[currentYear]; });
  data.features.forEach(function(d) { d.population = populationById[d.id] });

  // console.log(populationById);
  // console.log(data.features);


console.log(maxParticipation);

  var countries = mapNodePoint.append("g")
    .attr("class", "countries")
    .attr('id','countriesG')
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity",0.8)
    // tooltips
    .style("stroke","white")
    .style('stroke-width', 0.3)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseleave);


    countries.transition().duration(100)
        .style("fill", function(d) {
          // console.log(d);
          // console.log(colorScale(d.population));
          if(d.population == 0){
              return '#000000'
          }
          return colorScale(d.population);
        });

  mapNodePoint.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);

    // LEGEND STARTS HERE
    var w = 300, h = 50;

    var key = mapNodePoint
      .append("g")
      .attr('id','mapLegend')
      .attr("width", w)
      .attr("height", h);

    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "black")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "33%")
      .attr("stop-color", "#384615")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "66%")
      .attr("stop-color", "#8EBC1D")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#BFFF21")
      .attr("stop-opacity", 1);

    key.append("rect")
      .attr("width", w)
      .attr("height", h - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(390,630) rotate(0)");

    var y = d3.scaleLinear()
      .range([300, 0])
      .domain([68, 12]);

    // var yAxis = d3.axisBottom()
    //   .scale(y)
    //  .ticks(0);

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(375,630)")
      //.call(yAxis)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Fewer athletes")
      .style("font-size", "12px")
      .style('fill','white');

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(770,630)")
      //.call(yAxis)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("More athletes")
      .style("font-size", "12px")
      .style('fill','white');
}

function removeMapGraph(){
    d3.selectAll('#mapAllId').remove();
    d3.selectAll('#worldMapTooltip').remove();
    d3.selectAll('#countriesG').remove();
    d3.select('#mapLegend').remove();
}
