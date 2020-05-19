// @TODO: YOUR CODE HERE!


var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 40,
    right: 90,
    bottom: 40,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

    // grab where we need to put the plot
    var scatter = d3.select("#scatter");

    data.forEach((d) => {


        //grab poverty data
        var poverty = +d.poverty;
        var healthcare = +d.healthcare;
        var abbr = d.abbr
            // console.log(d.poverty);
            // console.log(d.healthcare);
    });

    //Create scales for X and Y
    var xLinearScale = d3.scaleLinear()
        .domain([8.5, d3.max(data, x => x.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([3.5, d3.max(data, x => x.healthcare)])
        .range([height, 0]);

    //Create axis
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    //Apned axis tot he chartgroup
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    //Lets make some circles
    var circles = chartGroup.selectAll("g circle")
        .data(data)
        .enter()
        .append("g")

    var circlesXY = circles.append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "lightblue")
        .attr("opacity", ".5")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

    var circlesText = circles.append("text")
        .text(d => d.abbr)
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare))
        .classed("stateText", true);

});

