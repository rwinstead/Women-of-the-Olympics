var heatNodePoint;

// set the dimensions and margins of the graph
var myMargin = {top: 80, right: 175, bottom: 250, left: 120},
  width = 1000 - myMargin.left - myMargin.right,
  height = 640 - myMargin.top - myMargin.bottom;

function updateHeatMap(year){

    heatNodePoint = d3.select('#staticCanvasSVG')
        svg.append('g')
        .attr("id", 'heatAllId');

  // append the svg object to the body of the page
  var svgLocal = heatNodePoint
    .append("svg")
    .attr('id', 'heatmapSVG')
    .attr("width", width + myMargin.left + myMargin.right)
    .attr("height", height + myMargin.top + myMargin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + myMargin.left + "," + myMargin.top + ")");

  //Read the data
  d3.csv("vizFiles/4heatMap/Ryan_heatmap_data.csv", function(data) {

    data = data.filter(function(d){ if (d.year> 1951 && d.year <=year) return d;})
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
      .attr('id','heatmapText')
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

    svgLocal.selectAll("g text")
      .style("fill","white")

    //Build color scale
    var myColor = d3.scaleLinear()
      .range(["#4078E1","#BFFF21"])
      .domain([0,1])

    // var myColor = d3.scaleLinear()
    //   .range(['#e6ba1c','#BFFF21'])
    //   .domain([0,1])



    // create a tooltip
    var tooltip = d3.select("#staticCanvas")
      .append("div")
      .attr('id', 'heatmapTooltip')
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

  // Add title to graph
  // svgLocal.append("text")
  //         .attr("x", 50)
  //         .attr("y", -50)
  //         .attr("text-anchor", "left")
  //         .style("font-size", "32px")
  //         .style('fill','#BFFF21')
  //         .text("Heatmap of women's participation by sport");

    // LEGEND STARTS HERE
    var w = 300, h = 50;

    var key = svgLocal
      .append("g")
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
      .attr("stop-color", "#4078E1")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "33%")
      .attr("stop-color", "#3B86AC")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "66%")
      .attr("stop-color", "#97DA4C")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#BFFF21")
      .attr("stop-opacity", 1);

    key.append("rect")
      .attr("width", w)
      .attr("height", h - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(890,150) rotate(90)");

    var y = d3.scaleLinear()
      .range([300, 0])
      .domain([68, 12]);

    // var yAxis = d3.axisBottom()
    //   .scale(y)
    //  .ticks(0);

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(900,120)")
      //.call(yAxis)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("100% men")
      .style("font-size", "12px");

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(900,465)")
      //.call(yAxis)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("100% women")
      .style("font-size", "12px");

//   // Add subtitle to graph
//   svgLocal.append("text")
//           .attr("x", 0)
//           .attr("y", -20)
//           .attr("text-anchor", "left")
//           .style("font-size", "14px")
//           .style("fill", "grey")
//           .style("max-width", 400)
//           .text("A short description of the take-away message of this chart.");
}

function removeHeatMap(){
    d3.select('#heatAllId').remove();
    d3.selectAll('#heatmapTooltip').remove();
    d3.selectAll('#heatmapSVG').remove();
}
