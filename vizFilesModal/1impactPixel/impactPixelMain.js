var individualImpactPixels = [];
var pixelsInitialized = false;
var pixelsState = -1;
var impactPixelText;
var impactNodePoint;
var impactPixelReduceCost = true;

initImpactPixels();

function initImpactPixels(){

    impactNodePoint = svg.append("g")
        .attr("class", 'impactAllId');

    for(var i=0;i<176;i++){

            var x = 500 + (i%10 * (widthOfImpacePixel+widthOfImpacePixel/2));
            var y = 500 - (Math.floor(i/10) * (widthOfImpacePixel+widthOfImpacePixel/2));

            var singlePixel = impactNodePoint
                .append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", widthOfImpacePixel)
                .attr("height", widthOfImpacePixel)
                .attr("fill", colorOfImpactPixel)
                .style("opacity", 0);

            individualImpactPixels.push(singlePixel);
    }

    impactPixelText = impactNodePoint.append("text")
        .attr('transform', 'translate(20,50) rotate(0)')
        .text('')
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#ffffff");
}


function makeImpactGraph(state){

    impactPixelReduceCost = true;

    if(state == 1){

        individualImpactPixels.forEach((item, i) => {
            item
            .transition()
            .duration(500)
            .style("opacity", 1);
        });

        impactPixelText.text("The number of MEN who participate in the 1896 olympics was #174");



    }else if(state == 2){

        individualImpactPixels.forEach((item, i) => {
            item
            .transition()
            .duration(500)
            .style("opacity", 0.1);
        });

        individualImpactPixels[0]
        .transition()
        .duration(1000)
        .style("opacity", 1);

        impactPixelText.text("The number of WOMEN who participate in the 1896 olympics was #");

    }else if(state == 3){

        individualImpactPixels.forEach((item, i) => {
            item
            .transition()
            .duration(1000)
            .style("opacity", 0);
        });

        impactPixelText.text("The number of WOMEN who participate in the 1896 olympics was #0");

    }

}

function removeImpactGraph(){

    if(impactPixelReduceCost){

        individualImpactPixels.forEach((item, i) => {
            item.style("opacity", 0);
        });

        impactPixelText.text("");
        impactPixelReduceCost = false;

    }

}
