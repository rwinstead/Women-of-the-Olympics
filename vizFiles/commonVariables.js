var width = 1000;
var height = 640;
var g_currentYear;
var g_caption;

var svg = d3.select("#staticCanvasSVG")
    .attr("width", width)
    .attr("height", height);

var widthOfImpacePixel = 10;
var colorOfImpactPixel = "#BFFF21";


var yearSvg = d3.select('.entire-fix')
	.append('svg');

function setYear(year){
	d3.select('#g_text').remove();
	g_currentYear = year;
	yearSvg.append('text')
          .attr("x", (width / 3))
          .attr("y", 80)
          .attr('id', 'g_text')
          .attr("text-anchor", "middle")
          .style("font-size", "72px")
          .style("fill", '#BFFF21')
          //.style("font-weight","bold")
          .style("font-family", 'Bebas Neue')
          .text(""+g_currentYear);
}

function setCaption(caption){
	d3.select('#g_caption').remove();
	 g_caption= caption;
	yearSvg.append('text')
          .attr("x", (width / 3)-44)
          .attr("y", 125)
          .attr('id', 'g_caption')
          .attr("text-anchor", "left")
          .style("font-size", "22px")
          .style("fill", 'white')
          //.style("font-weight","bold")
          //.style("font-family", 'Bebas Neue')
          .text(""+g_caption);
}


