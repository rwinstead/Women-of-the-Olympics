var circleNodePoint;

function updateCircleGraph(year){

  //console.log('circle graph is working');

  circleNodePoint = d3.select('#staticCanvasSVG')
      svg.append("g")
      .attr("width", 825)
      .attr("height", 530)
      .attr("id", 'circleAllId');

  // Read data
  d3.csv("vizFiles/3circleGraph/Ryan_sports_data.csv", function(data) {
    // Filter a bit the data -> more than 1 million inhabitants
    data = data.filter(function(d){ return d.year==year})
    // console.log(data);

    var currentYear = data[0]['year'];
    var max = d3.max(data, d => parseInt(d.participants));
    var min = d3.min(data, d => parseInt(d.participants));
    // console.log(max);
    // console.log(min);

    //  YEAR IN TOP LEFT
    // svg.append("text")
    //       .attr("x", (width / 8))
    //       .attr("y", 80)
    //       .attr("text-anchor", "middle")
    //       .style("font-size", "72px")
    //       .style("fill", '#BFFF21')
    //       //.style("font-weight","bold")
    //       .style("font-family", 'Bebas Neue')
    //       .text(""+currentYear);

  // GET DOMAIN FOR THE COLOR SCHEMA
  var myDomain = []

  function getDomainData() {
    var i;
    for (i=0; i < data.length; i++){
      myDomain.push(data[i]['sport'])
    }
  }
  getDomainData(data);

    // Color palette for continents?
    var color = d3.scaleOrdinal()
      .domain(myDomain)
      .range(['#BFFF21','#a5d42c','#85cf48','#dfffb5']);

    // Size scale for countries
    var size = d3.scaleLinear()
      .domain([min, max])
      .range([30,80])  // circle will be between 7 and 55 px wide

    // create a tooltip
    var Tooltip = d3.select("#staticCanvas")
      .append("div")
      .attr("id", 'circleTooltip')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#333333")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style('color','#BFFF21')
      .style("position", "absolute")
      .style("z-index", "10");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
    }
  var mousemove = function(d) {

    Tooltip
      .html("<b>Number of participants: </b><span class='details'>" + d.participants+'</span>')
      .style("left", (d3.mouse(this)[0]) + "px")
      .style("top", d3.event.clientY-90 + "px") //(d3.mouse(this)[1])
  }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
    }

    // Initialize the circle: all located at the center of the svg area
    var node = circleNodePoint.append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "node")
        .attr('id', 'drawnCircle')
        .attr("r", function(d){ return size(d.participants)})
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d){ return color(d.sport)})
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 0)
        .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .call(d3.drag() // call specific function when circle is dragged
             .on("start", dragstarted)
             .on("drag", dragged)
             .on("end", dragended));

      var circle_text = circleNodePoint.selectAll('circle_text')
          .data(data)
          .enter()
          .append('text')
          .attr('id', 'circleTextId')
            .attr('x', width/2)
            .attr('y', height/2)
            .attr("font-size", '12px')
            .attr("font-family", "sans-serif")
            .style("text-anchor", "middle")
            .attr("fill", '#ffffff')
            .text(function(d) { return ""+d.sport;});


    // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.participants)+3) }).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(data)
        .on("tick", function(d){
          node
              .attr("cx", function(d){ return d.x; })
              .attr("cy", function(d){ return d.y; })
          circle_text
              .attr("x", function(d){ return d.x; })
              .attr("y", function(d){ return d.y; })
        });

    // What happens when a circle is dragged?
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }

    });
}


function removeCircleGraph(){
    d3.select('#circleAllId').remove();
    d3.selectAll('#circleTextId').remove();
    d3.selectAll('#drawnCircle').remove();
    d3.selectAll('#circleTooltip').remove();
}
