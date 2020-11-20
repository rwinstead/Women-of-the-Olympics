var heatNodePointM;

// set the dimensions and margins of the graph
var myMarginM = {top: 80, right: 25, bottom: 30, left: 150},
  width = 1000 - myMarginM.left - myMarginM.right,
  height = 640 - myMarginM.top - myMarginM.bottom;


var svg3 = d3.select("#graph3")
  .attr("width", width)
  .attr("height", height);

function updateHeatMapM(year){

    heatNodePointM = svg3.append("g")
        .attr("id", 'heatAllIdModal');

  // append the svg object to the body of the page
  var svgLocal = heatNodePointM
    .append("svg")
    .attr('id', 'heatmapSVGModal')
    .attr("width", width + myMarginM.left + myMarginM.right)
    .attr("height", height + myMarginM.top + myMarginM.bottom)
    .append("g")
    .attr("transform",
          "translate(" + myMarginM.left + "," + myMarginM.top + ")");

  //Read the data
  d3.csv("vizFiles/4heatMap/Ryan_heatmap_data.csv", function(data) {

    data = data.filter(function(d){ if (d.year <=year) return d;})
    // console.log(data);
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3.map(data, function(d){return d.year;}).keys();
    var myVars = d3.map(data, function(d){return d.sport;}).keys();

    myGroups = myGroups.sort(d3.ascending);


    // Build X scales and axis:
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.05);

    svgLocal.append("g")
      .style('fill','white')
      .style("font-size", 12)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)
      .padding(0.05);

    svgLocal.append("g")
      .style("font-size", 12)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()

    svgLocal.selectAll("text")
      .style("fill","white")

    //Build color scale
    var myColor = d3.scaleLinear()
      .range(["#4078E1","#BFFF21"])
      .domain([0,1])

    // var myColor = d3.scaleLinear()
    //   .range(['#e6ba1c','#BFFF21'])
    //   .domain([0,1])



    // create a tooltip
    var tooltip = d3.select("#myModal3")
      .append("div")
      .attr('id', 'heatmapTooltipModal')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#333333")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style('color','#BFFF21')
      .style("position", "absolute")
      .style("z-index", "10")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "#333333")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      tooltip
        .html("<b>Sport: </b><span class='details'>"+ d.sport + '</span><br> <b>Percent of women athletes: </b><span class="details">' + d.percent_women+"<span class='details'>")
        .style("left", (d3.mouse(this)[0]+40) + "px")
        .style("top", d3.event.clientY-80 + "px")
    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    // add the squares
    svgLocal.selectAll()
      .data(data, function(d) {return d.year+':'+d.sport;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(d.sport) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.percent_women)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  })

  // // Add title to graph
  // svgLocal.append("text")
  //         .attr("x", 0)
  //         .attr("y", -50)
  //         .attr("text-anchor", "left")
  //         .style("font-size", "22px")
  //         .text("A d3.js heatmap");

  // // Add subtitle to graph
  // svgLocal.append("text")
  //         .attr("x", 0)
  //         .attr("y", -20)
  //         .attr("text-anchor", "left")
  //         .style("font-size", "14px")
  //         .style("fill", "grey")
  //         .style("max-width", 400)
  //         .text("A short description of the take-away message of this chart.");
}

function removeHeatMapM(){
    d3.select('#heatAllIdModal').remove();
    d3.selectAll('#heatmapTooltipModal').remove();
    d3.selectAll('#heatmapSVGModal').remove();
}
