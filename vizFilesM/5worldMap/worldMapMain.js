var mapNodePointM;

var currentYearM = '1948';
var pathM;

var svg5 = d3.select("#graph4")
    .attr("width", width)
    .attr("height", height);

function updateWorldMapM(year){

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 1000 - margin.left - margin.right,
                height = 640 - margin.top - margin.bottom;

    pathM = d3.geoPath();

    mapNodePointM = svg5
                .append('g')
                .attr('id', 'mapAllIdModal');

    var projection = d3.geoMercator()
                       .scale(130)
                      .translate( [width / 2, height / 1.5]);

    pathM = d3.geoPath().projection(projection);

    currentYearM = year;

    queue()
        .defer(d3.json, "vizFilesM/5worldMap/world_countries.json")
        .defer(d3.tsv, "vizFilesM/5worldMap/country_participation.tsv")
        .await(readyM);

}


function readyM(error, data, population) {


      var Tooltip = d3.select("#myModal4")
        .append("div")
        .attr("id", 'worldMapTooltipModal')
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

  // console.log(error);
  // console.log(data);
  // console.log(population);

  var maxParticipation = 0;

  population.forEach(function(d) {
      // console.log(d['2016']);
      if (d[currentYearM] > maxParticipation){
          maxParticipation = d[currentYearM];
      }
  });


  // var colorScale = d3.scaleLinear().domain([0,200]).range(["#BFFF21", "#004FE9"]);
  // var colorScale = d3.scaleLinear().domain([0,maxParticipation]).range(["#111111", "#BFFF21"]);
  var colorScale = d3.scaleLinear().domain([0,180]).range(["#111111", "#BFFF21"]);


  population.forEach(function(d) { populationById[d.id] = +d[currentYearM]; });
  data.features.forEach(function(d) { d.population = populationById[d.id] });

  // console.log(populationById);
  // console.log(data.features);


  // console.log(maxParticipation);

  var countries = mapNodePointM.append("g")
    .attr("class", "countries")
    .attr('id','countriesGModal')
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

  mapNodePointM.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", pathM);
}


function removeMapGraphM(){
    d3.selectAll('#mapAllIdModal').remove();
    d3.selectAll('#worldMapTooltipModal').remove();
    d3.selectAll('#countriesGModal').remove();
}
