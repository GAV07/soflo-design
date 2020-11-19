


function dataHandling() {

    
}

function barChart(element, data, column) {
    let padding = 20

    //data processing
    const columnAccessor = d => d[`${column}`]
    //const columnbyGroup = d3.group(data, columnAccessor)
    const columnCount = d3.rollup(data, d => d.length, columnAccessor)
    const greatest = d3.greatest(columnCount, ([, d]) => d)
    const keys = [...columnCount.keys()]
    console.log(keys)

    const $div = element.select(".section__charts")
        .append("div")
        .attr("class", "outer-frame")
        .attr("id", column)
        .append("div")
        .attr("class", "inner-frame")

    let width = d3.select(".inner-frame").node().offsetWidth
    let height = d3.select(".inner-frame").node().offsetHeight

    const xScale = d3.scaleBand()
        .domain(keys)
        .range([0, width])
        .padding(0.3)
    
    const yScale = d3.scaleLinear()
        .domain([0, greatest[1]])
        .range([height, 0])
    
    const $svg = $div.append("svg")
        .attr("width", width)
        .attr("height", height)

    $svg.selectAll(".bar")
        .data(columnCount)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", ([k, d]) => xScale(k))
        .attr("width", xScale.bandwidth())
        .attr("y", ([, d]) =>  yScale(d))
        .attr("height", ([, d]) => yScale(0) - yScale(d))
    
}


export default { barChart } 