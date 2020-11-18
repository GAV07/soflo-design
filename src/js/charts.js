



function barChart(element, data, column) {
    const columnAccessor = d => d[`${column}`]
    const columnbyGroup = d3.group(data, columnAccessor)
    const columnCount = d3.rollup(data, d => d.length, columnAccessor)
    console.log(columnCount)
    console.log(columnbyGroup)

    const xScale = d3.scaleBand()
        .domain(data.map(columnAccessor))
        .range([0,500])

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, columnAccessor))
        .range([0,500])

    element.select(".section__charts").selectAll(".chart").data(columnbyGroup)

    
}


export default { barChart } 