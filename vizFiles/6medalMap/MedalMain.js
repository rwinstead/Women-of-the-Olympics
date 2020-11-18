var medalNodePoint;

function updateMedalGraph(year){

// set the dimensions and margins of the graph
var margin = {top: 0, right: 20, bottom: 60, left: 170},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



var medalNodePoint = d3.select('#staticCanvasSVG')
  //.append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
  // .append("g")
  //   .attr("transform",
  //         "translate(" + 100 + "," + margin.top + ")");

var currentYear = year;

// Parse the Data
d3.csv("vizFiles/6medalMap/Ryan_medal_data.csv", function(data) {
  // List of subgroups = header of the csv files = soil condition here
  var medals = data.columns.slice(2)
  data = data.filter(function(d){ return d.year==currentYear})
  sortedData = data.slice().sort((a, b) => d3.descending(parseInt(a.bronze)+parseInt(a.silver)+parseInt(a.gold), parseInt(b.bronze)+parseInt(b.silver)+parseInt(b.gold)))
  data=sortedData.slice(0,9)


  var i;
  for (i = 0; i < data.length; i++) {
  data[i]['Total']=parseInt(data[i]['bronze']) + parseInt(data[i]['silver']) + parseInt(data[i]['gold']) ;
    }

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var countries = d3.map(data, function(d){return(d.country)}).keys()
  var max = d3.max(data, d => parseInt(d.Total));

  // Add Y axis
  var y = d3.scaleBand()
      .domain(countries)
      .range([0, height])
      .padding([0.3])
  medalNodePoint.append("g")
    //.attr('font-size',20)
    .call(d3.axisLeft(y))
    .attr('stroke-width',0)
    .call(g => g.select(".domain").remove());

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, max+5])
    .range([0,width ]);
  // svg.append("g")
  //   .call(d3.axisBottom(x));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(medals)
    .range(['#8E5A0C','#BBBBBB','#FFBB0D'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(medals)
    (data)

  // console.log(stackedData);

  //console.log(stackedData[2]);

medalNodePoint.selectAll(".tick text")
     .attr('id','countryLabels')
     .attr("font-size","17")
     .attr('fill','white')
     .attr('transform','translate(140,60)');

// svg.selectAll("text")
//       .style("fill","white")

  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#staticCanvas")
    .append("div")
    .style("opacity", 0)
    .attr("id", "medalTooltip")
    .attr("class", "tooltip")
    .style("background-color", "#333333")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style('color','#BFFF21')
    .style("position", "absolute")
    .style("z-index", "10")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    tooltip
        .html("<b>Medal: </b><span class='details'>" + subgroupName + "</span><br>" + "<b>Number won: </b><span class='details'>" + subgroupValue+'</span>')
        .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+150) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", d3.event.clientY-100 + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
  }


  // Show the bars
  medalNodePoint.append("g")
    .attr('transform','translate(140,60)')
    .attr('id','medalBarsG')
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("y", function(d) { return y(d.data.country); })
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return (x(d[1]) - x(d[0])); })
        .attr("height",y.bandwidth())
        //.attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);


  var bartext = medalNodePoint.selectAll('bar_text')
      .data(data)
      .enter()
      .append('text')
        .attr('transform','translate(140,60)')
        .attr('id', 'medalText')
        .attr('x', function(d) { return x(d.Total)+55;})
        .attr('y', function(d) { return y(d.country)+30; })
        .attr("font-size", '12px')
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .attr("fill", '#BFFF21')
        .text(function(d) { return "Total medals: "+d.Total;});


  })
}

function removeMedalGraph()
{
  d3.select('#medalAllId').remove();
  d3.selectAll('#medalTooltip').remove();
  d3.selectAll('#medalBarsG').remove();
  d3.selectAll('#medalText').remove();
  d3.selectAll('#countryLabels').remove();

}
