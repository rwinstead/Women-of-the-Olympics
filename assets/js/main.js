var currentId = -1;

$(document).ready(function () {
    $(".more-down").hide();
    $(".more-up").hide();
    var flag_down = 0;
    var ribbon = 0;

    function morebutton() {
        var $windowheight = $(window).height();
        var flag = 0;
        var $timelineheight = $(".timeline").height();
        $(".more-down").css({
            "top": $windowheight - 90 + "px"
        });
        $(".more-up").css({
            "bottom": $windowheight - 120 + "px" //important important important important important
        });
        if ($windowheight < 880 && flag == 0 && flag_down == 0) {
            $(".more-down").show();
            flag = 1;
            $(".more-down").unbind().click(function () {
                $(".more-down").hide();
                $(".timeline-relative").css({
                    "top": $windowheight - $timelineheight - 80 + "px"
                });
                flag_down = 1; //important important important important important
                ribbon = 0;
                moreupbutton();
            });
        } else {
            $(".more-down").hide();
            flag = 0;
        }
    }

    function moreupbutton() {
        if (flag_down == 1) {
            if (ribbon == 0) {
                $(".more-up").delay(800).show(0);
            }
            if (ribbon == 1) {
                $(".more-up").show(0);
            }
            $(".more-up").unbind().click(function () {
                $(".more-up").hide();
                $(".timeline-relative").css({
                    "top": 0 + "px"
                });
                flag_down = 0;
                setTimeout(morebutton, 800);
            });
        }
    }

    $(window).resize(function () {
        if (flag_down == 1 && $(window).height() > 880) {
            $(".timeline-relative").css({
                "top": 0 + "px"
            });
            flag_down = 0;
        }
        if ($(window).height() > 880) {
            $(".more-down").hide();
            $(".more-up").hide();
        }
    });

    $(".fixed-timeline").mouseenter(function () {
        morebutton();
        if (flag_down == 1) {
            ribbon = 1;
        }
        moreupbutton();
    })

    $(".fixed-timeline").mouseleave(function () {
        $(".more-down").hide();
        $(".more-up").hide();
    })

    var id;
    var elemside;
    var elemarray = [];
    var dataout;
    var navElem;
    var newid;
    var ImgElem;
    var TextElem;
    var NumberElem;
    elemside = $(".interaction");
    elemside.each(function (index) {
        elemarray[index] = parseInt($(this).data("year").slice(4, 8));
    });

    function scrolldetect() {
        var currentTop = $(window).scrollTop();
        var elems = $('.scrollspy');
        elems.each(function (index) {
            var elemTop = $(this).offset().top;
            var elemBottom = elemTop + $(this).height();
            if (currentTop >= (elemTop - 10) && currentTop <= (elemBottom)) {
                id = $(this).attr('id');
                if (id == "year2016") {
                    console.log($(window).scrollTop())
                }
                dataout = $(this).attr("data-out-year");
                navElem = $('.timeline li a[href="#' + id + '"]');
                navElem.parent().addClass('active').siblings().removeClass('active');
                timescroll();
                if (id == "out") {
                    $(".out-hide").css({
                        "opacity": "0"
                    });
                } else if (id != "out") {
                    $(".out-hide").css({
                        "opacity": "1"
                    });
                }
                if (id != currentId) {
                    currentId = id;
                    updateViz(id);
                }
                newid = parseInt(id.slice(4, 8));
                if (newid > 1912 || dataout == "year1912") {
                    $("#myinteraction1").parent().addClass('side-visible');
                }
                if (newid > 1952 || dataout == "year1952") {
                    $("#myinteraction2").parent().addClass('side-visible');
                }
                if (newid > 1976 || dataout == "year1976") {
                    $("#myinteraction3").parent().addClass('side-visible');
                }
                if (newid > 2000 || dataout == "year2000") {
                    $("#myinteraction4").parent().addClass('side-visible');
                }
                if (newid > 2016 || dataout == "year2016") {
                    $("#myinteraction5").parent().addClass('side-visible');
                }

                ImgElem = $('.imgline li img[data-img-year="' + id + '"]');
                ImgElem.parent().addClass('active').siblings().removeClass('active');
                TextElem = $('.summary-text span[data-text-year="' + id + '"]');
                TextElem.addClass('active').siblings('.span-text').removeClass('active');
                NumberElem = $('.summary-text span[data-number-year="' + id + '"]');
                NumberElem.addClass('active').siblings('.span-num').removeClass('active');
                if (id != "year1896" || id != "year1896_a" || id != "year1896_b") {
                    $(".summary-list").css({
                        "display": "inline-block"
                    });
                }
                if (id == "year1896" || id == "year1896_a" || id == "year1896_b") {
                    $(".summary-list").css({
                        "display": "none"
                    });
                }

            }
        })
    }

    function scrollstick() {
        if ($(window).scrollTop() >= 42000) {
            $(".entire-fix").css({
                "position": "relative",
                "top": "40300px"
            });
            console.log("hello");
        } else if ($(window).scrollTop() < 42000) {
            $(".entire-fix").css({
                "position": "sticky",
                "top": "0"
            });
        }
    }


    // function scrollanimate() {
    //     var currentTop = $(window).scrollTop() + 600;
    //     var animate_elem = $('.textchange div');
    //     animate_elem.each(function (index) {
    //         var elemTop = $(this).offset().top;
    //         var elemBottom = elemTop + $(this).height() + 600;
    //         if ((currentTop >= (elemTop - 10)) && (currentTop <= elemBottom)) {
    //             $(this).addClass('animate_appear');
    //         }
    //         if ((currentTop > elemBottom - 400)) {
    //             $(this).removeClass('animate_appear');
    //         }
    //         if (currentTop < (elemTop - 10)) {
    //             $(this).removeClass('animate_appear');
    //         }
    //     })
    // }

    function updateViz(yearId) {

        //document.getElementById("staticCanvasSVG").innerHTML = "";


        // 1. mpact Graph
        if (yearId == 'year1896') {
            makeImpactGraph(1);
            setYear('1896');
            setCaption('No women are allowed to compete');
        } else if (yearId == 'year1896_a') {
            makeImpactGraph(2);
            setCaption('Number of women participating by year');
        } else if (yearId == 'year1896_b') {
            makeImpactGraph(3);
            setCaption('Number of women participating by year');
        } else {
            removeImpactGraph();
        }
        // End Impact Graph



        // 2. Pixel Graph
        if (yearId == 'year1900') {
            pixelGraph('1900');
            setYear('1900');
            setCaption('Women are introduced to the Olympics');
        } else if (yearId == 'year1904') {
            pixelGraph('1904');
            setYear('1904');
            setCaption('Number of women participating by year');
        } else if (yearId == 'year1906') {
            pixelGraph('1906');
            setYear('1906');
            setCaption('Number of women participating by year');
        } else if (yearId == 'year1908') {
            pixelGraph('1908');
            setYear('1908');
            setCaption('Number of women participating by year');
        } else if (yearId == 'year1912') {
            pixelGraph('1912');
            setYear('1912');
            setCaption('Number of women participating by year');
        } else {
            removePixelGraph();
        }
        // End Pixel Graph


        // 3. Circle Graph
        if (yearId == 'year1912_a') {
            removeCircleGraph();
            updateCircleGraph('1912');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1920') {
            removeCircleGraph();
            updateCircleGraph('1920');
            setYear('1920');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1924') {
            removeCircleGraph();
            updateCircleGraph('1924');
            setYear('1924');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1928') {
            removeCircleGraph();
            updateCircleGraph('1928');
            setYear('1928');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1932') {
            removeCircleGraph();
            updateCircleGraph('1932');
            setYear('1932');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1936') {
            removeCircleGraph();
            updateCircleGraph('1936');
            setYear('1936');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1948') {
            removeCircleGraph();
            updateCircleGraph('1948');
            setYear('1948');
            setCaption('Distribution of women athletes by sports');
        } else if (yearId == 'year1952') {
            removeCircleGraph();
            updateCircleGraph('1952');
            setYear('1952');
            setCaption('Distribution of women athletes by sports');
        } else {
            removeCircleGraph();
        }
        // End Circle Graph


        // 4. Heat Graph
        if (yearId == 'year1952_a') {
            removeHeatMap();
            updateHeatMap(1952);
            setCaption('Gender Equality in sports');
        } else if (yearId == 'year1956') {
            removeHeatMap();
            updateHeatMap(1956);
            setYear('1956');
            setCaption('Gender Equality in sports');
        } else if (yearId == 'year1960') {
            removeHeatMap();
            updateHeatMap(1960);
            setCaption('Gender Equality in sports');
            setYear('1960');
        } else if (yearId == 'year1964') {
            removeHeatMap();
            updateHeatMap(1964);
            setCaption('Gender Equality in sports');
            setYear('1964');
        } else if (yearId == 'year1968') {
            removeHeatMap();
            updateHeatMap(1968);
            setYear('1968');
            setCaption('Gender Equality in sports');
        } else if (yearId == 'year1972') {
            removeHeatMap();
            updateHeatMap(1972);
            setYear('1972');
            setCaption('Gender Equality in sports');
        } else if (yearId == 'year1976') {
            removeHeatMap();
            updateHeatMap(1976);
            setYear('1976');
            setCaption('Gender Equality in sports');
        } else {
            removeHeatMap();
        }
        // End Heat Graph


        // 5. Map Graph
        if (yearId == 'year1976_a') {
            removeMapGraph();
            updateWorldMap('1976');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year1980') {
            removeMapGraph();
            updateWorldMap('1980');
            setYear('1980');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year1984') {
            removeMapGraph();
            updateWorldMap('1984');
            setYear('1984');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year1988') {
            removeMapGraph();
            updateWorldMap('1988');
            setYear('1988');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year1992') {
            removeMapGraph();
            updateWorldMap('1992');
            setYear('1992');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year1996') {
            removeMapGraph();
            updateWorldMap('1996');
            setYear('1996');
            setCaption('Distribution of women athletes across the world by year');
        } else if (yearId == 'year2000') {
            removeMedalGraph();
            updateWorldMap('2000');
            setYear('2000');
            setCaption('Distribution of women athletes across the world by year');
        } else {
            removeMapGraph();
        }
        // End Map Graph


        //Start Medal Graph
        if (yearId == 'year2000_a') {
            removeMedalGraph();
            updateMedalGraph('2000');
            setYear('2000');
            setCaption("Distribution of women's medal count for top 10 countries");
        } else if (yearId == 'year2004') {
            removeMedalGraph();
            updateMedalGraph('2004');
            setYear('2004');
            setCaption("Distribution of women's medal count for top 10 countries");
        } else if (yearId == 'year2008') {
            removeMedalGraph();
            updateMedalGraph('2008');
            setYear('2008');
            setCaption("Distribution of women's medal count for top 10 countries");
        } else if (yearId == 'year2012') {
            removeMedalGraph();
            updateMedalGraph('2012');
            setYear('2012');
            setCaption("Distribution of women's medal count for top 10 countries");
        } else if (yearId == 'year2016') {
            removeMedalGraph();
            updateMedalGraph('2016');
            setYear('2016');
            setCaption("Distribution of women's medal count for top 10 countries");
        } else {
            removeMedalGraph();
        }
        // document.getElementById("staticCanvasSVG").innerHTML = "";

    }

    function timescroll() {
        $(".timeline li.active").prevAll().addClass("white");
        $(".timeline li.active").nextAll().removeClass("white");
        $(".timeline li.active").removeClass("white");
    }

    $(window).bind('scroll', function () {
        scrolldetect();
        timescroll();
        // scrollanimate();
        scrollstick();
    });

    scrolldetect();
    timescroll();
    scrollstick();

    $("#myinteraction1").click(function () {
        $("#myModal1").fadeIn();
    })

    $("#myinteraction2").click(function () {
        $("#myModal2").fadeIn();
    })

    $("#myinteraction3").click(function () {
        $("#myModal3").fadeIn();
    })

    $("#myinteraction4").click(function () {
        $("#myModal4").fadeIn();
    })

    $("#myinteraction5").click(function () {
        $("#myModal5").fadeIn();
    })

    $(".close").click(function () {
        $(this).parents(".modal").fadeOut();
    })

    $(window).on("click", function (event) {
        if ($(event.target).attr('class') == 'modal') {
            $(".modal").fadeOut();
        }
    });


    var newyearvalue;
    var newid;
    var interactionid;
    var sliderid;
    var slider = $(".slider");
    var slider1 = $("#slider1");
    var slider2 = $("#slider2");
    var slider3 = $("#slider3");
    var slider4 = $("#slider4");
    var slider5 = $("#slider5");
    var output = $(".demo");

    function scrollslider(slider) {
        var id = $(".timeline li.active a").attr('href');
        newid = parseInt(id.slice(5, 9));
        newyearvalue = yearvaluereverse(newid);
        slider.val(newyearvalue);
    }

    $(".interaction").click(function () {
        interactionid = $(this).attr("id");
        switch (interactionid) {
            case 'myinteraction1':
                slider = slider1;
                break;
            case 'myinteraction2':
                slider = slider2;
                break;
            case 'myinteraction3':
                slider = slider3;
                break;
            case 'myinteraction4':
                slider = slider4;
                break;
            case 'myinteraction5':
                slider = slider5;
                break;
        };
        scrollslider(slider);
        sliderUpdate(slider);
    })
    slider.on('input', function () {
        sliderid = $(this).attr("id");
        switch (sliderid) {
            case 'slider1':
                slider = slider1;
                break;
            case 'slider2':
                slider = slider2;
                break;
            case 'slider3':
                slider = slider3;
                break;
            case 'slider4':
                slider = slider4;
                break;
            case 'slider5':
                slider = slider5;
                break;
        };
        sliderUpdate(slider);
    })

    function sliderUpdate(slider) {
        var sliderVal = slider.val();
        var yearval = yearvalue(sliderVal);
        var yearid = "year" + yearval; //need to use yearid for vis

        // removePixelGraphM();
        // pixelGraphM(year + "");

        removePixelGraphM();
        pixelGraphM(yearval + "");

        removeCircleGraphM();
        updateCircleGraphM(yearval + "");

        removeHeatMapM();
        updateHeatMapM(yearval + "");

        removeMapGraphM();
        updateWorldMapM(yearval + "");

        removeMedalGraphM();
        updateMedalGraphM(yearval + "");


        console.log(yearid);
        output.html(yearval);
        var sliderwidth = parseInt(slider.css("width"));
        if (sliderwidth > 630) {
            output.css({
                "top": 48 + slider.val() * 23 + "px"
            });
        } else {
            output.css({
                "top": 28 + slider.val() * 22.2 + "px"
            });
        }

    }

    function yearvalue(sliderVal) {
        switch (sliderVal) {
            case '1':
                return (1900);
            case '2':
                return (1904);
            case '3':
                return (1906);
            case '4':
                return (1908);
            case '5':
                return (1912);
            case '6':
                return (1920);
            case '7':
                return (1924);
            case '8':
                return (1928);
            case '9':
                return (1932);
            case '10':
                return (1936);
            case '11':
                return (1948);
            case '12':
                return (1952);
            case '13':
                return (1956);
            case '14':
                return (1960);
            case '15':
                return (1964);
            case '16':
                return (1968);
            case '17':
                return (1972);
            case '18':
                return (1976);
            case '19':
                return (1980);
            case '20':
                return (1984);
            case '21':
                return (1988);
            case '22':
                return (1992);
            case '23':
                return (1996);
            case '24':
                return (2000);
            case '25':
                return (2004);
            case '26':
                return (2008);
            case '27':
                return (2012);
            case '28':
                return (2016);
        }
    }

    function yearvaluereverse(newid) {
        switch (newid) {
            case 1896:
                return (1);
            case 1900:
                return (1);
            case 1904:
                return (2);
            case 1906:
                return (3);
            case 1908:
                return (4);
            case 1912:
                return (5);
            case 1920:
                return (6);
            case 1924:
                return (7);
            case 1928:
                return (8);
            case 1932:
                return (9);
            case 1936:
                return (10);
            case 1948:
                return (11);
            case 1952:
                return (12);
            case 1956:
                return (13);
            case 1960:
                return (14);
            case 1964:
                return (15);
            case 1968:
                return (16);
            case 1972:
                return (17);
            case 1976:
                return (18);
            case 1980:
                return (19);
            case 1984:
                return (20);
            case 1988:
                return (21);
            case 1992:
                return (22);
            case 1996:
                return (23);
            case 2000:
                return (24);
            case 2004:
                return (25);
            case 2008:
                return (26);
            case 2012:
                return (27);
            case 2016:
                return (28);
        }
    }
});
