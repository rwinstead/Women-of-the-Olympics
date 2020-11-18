var individualPixelsMainM = [];
var textMainPixelM = "";
var pixelNodePointM;
var pixelParticipantData = [];

var svg1 = d3.select("#graph1");

loadDataM();

function loadDataM(){

    pixelNodePointM = svg1.append("g")
        .attr("id", 'pizelAllIdM');

    d3.csv("vizFilesM/2pixelBar/pixelMainData.csv", function(data) {
        // data = data.filter(function(d){ return d.year==year})
        var year = data['year'];
        var participants = data['participants'];


        var Tooltip = d3.select("#myModal1")
          .append("div")
          .attr("id", 'pixelTooltipModal')
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
                .style("opacity", 1);

            var outerH = d['target']['outerHTML'].split(" ");
            var inner = outerH[3].split("=")[1];

            Tooltip
              .html("<b>Number of participants: </b><span class='details'>" + inner +'</span>')
              .style("left", d.clientX + "px")
              .style("top", d.clientY + "px"); //(d3.mouse(this)[1])
        }
        var mousemove = function(d) {

            var outerH = d['target']['outerHTML'].split(" ");
            var inner = outerH[3].split("=")[1];

            Tooltip
              .html("<b>Number of participants: </b><span class='details'>" + inner +'</span>')
              .style("left", d.clientX + "px")
              .style("top", d.clientY + "px"); //(d3.mouse(this)[1])
        }
        var mouseleave = function(d) {

            Tooltip
                .style("opacity", 0);

        }

        var singlePixel = pixelNodePointM
            .append("rect")
            .attr("x", 1000)
            .attr("y", 600 - participants/10)
            .attr("width", 0)
            .attr("height", participants/10)
            .attr("fill", colorOfImpactPixel)
            .style("opacity", 0)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        individualPixelsMainM.push([year, singlePixel]);
        pixelParticipantData.push([year,participants]);
    });

    var years = ['1896', '1900', '1904', '1906', '1908', '1912', '1920', '1904'
                , '1928', '1932', '1936', '1948', '1952', '1956', '1960', '1964'
                , '1968', '1972', '1976', '1980', '1984', '1988', '1992', '1996'
                , '2000', '2004', '2008', '2012', '2016'];

    var startingX = 18;

    years.forEach((item, i) => {
        startingX += 32;
        pixelNodePointM
            .append('text')
            .text(item)
            .attr('x', startingX )
            .attr('y', '620')
            .attr("font-size", "10px")
            .style('fill','white');
    });

    console.log(individualPixelsMainM);
}


function pixelGraphM(year){

    var count = 0;
    var maxRow = 0;

    individualPixelsMainM.sort(function(a, b) {
        return a[0] - b[0];
    });

    widthOfImpacePixelNew = 20;

    var startingX  = 50;
    var startingY  = 600;

    // console.log(pixelParticipantData);

    individualPixelsMainM.forEach((item, i) => {
        if(item[0]<=year){
            startingX += 32;
            item[1]
                .style("opacity", 1)
                .attr("x", startingX)
                .attr("width", widthOfImpacePixelNew);
        }else{
            item[1].style("opacity", 0)
                .attr("x", 1000)
                .attr("width", 0);

        }
    });

    d3.csv("vizFilesM/2pixelBar/pixelMainData.csv", function(data) {



    });



}


function removePixelGraphM(){

    // d3.selectAll('#pixelTooltipModal').remove();

    textMainPixelM = "";
    widthOfImpacePixel = 10;

    individualPixelsMainM.forEach((item, i) => {
        item[1].style("opacity", 0)
            .attr("x", 1000)
            .attr("width", 0);
    });
}
