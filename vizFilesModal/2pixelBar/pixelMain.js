var individualPixelsMain = [];
var textMainPixel = "";
var activeYears = [];
var pixelNodePoint;

loadData();

function loadData(){

    pixelNodePoint = svg.append("g")
        .attr("class", 'pizelAllId');

    d3.csv("vizFiles/2pixelBar/pixelMainData.csv", function(data) {
        // data = data.filter(function(d){ return d.year==year})

        var year = data['year'];

        if(year<=1912){

            var participants = data['participants'];
            var yearPixels = [];

            for(var i=0;i<participants;i++){
                var x = 10000;
                var y = 500;

                var singlePixel = pixelNodePoint.append("rect")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("width", 0)
                    .attr("height", 0)
                    .attr("fill", colorOfImpactPixel)
                    .style("opacity", 0);

                yearPixels.push(singlePixel);
            }

            individualPixelsMain.push([year, yearPixels]);
        }

    });

    // console.log(individualPixelsMain);
}



function pixelGraph(year){


    individualPixelsMain.sort(function(a, b) {
        return a[0] - b[0];
    });

    var startingX  = -150;
    var startingY  = 500;

    var widthOfImpacePixelNew = 10;


    individualPixelsMain.forEach((item, i) => {
        if(item[0]<=year){
            startingX += 200;
            item[1].forEach((pixel, pixelNum)=>{
                pixel
                .transition()
                .duration(500)
                .style("opacity", 1)
                .attr("x", startingX + (pixelNum%10 * (widthOfImpacePixelNew+widthOfImpacePixelNew/2)))
                .attr("y", startingY - (Math.floor(pixelNum/10) * (widthOfImpacePixelNew+widthOfImpacePixelNew/2)))
                .attr("width", widthOfImpacePixelNew)
                .attr("height", widthOfImpacePixelNew);
            });
        }else{
            item[1].forEach((pixel, pixelNum)=>{
                pixel
                .transition()
                .duration(500)
                .style("opacity", 0)
                .attr("x", 1000)
                .attr("y", 500)
                .attr("width", 0)
                .attr("height", 0);
            });
        }
    });

}


function removePixelGraph(){
    textMainPixel = "";
    widthOfImpacePixel = 10;

    individualPixelsMain.forEach((item, i) => {
            item[1].forEach((pixel, pixelNum)=>{
                pixel
                .style("opacity", 0);
                pixel
                .attr("x", 1000);
                pixel
                .attr("y", 500);
                pixel
                .attr("width", 0);
                pixel
                .attr("height", 0);
            });
    });
}
