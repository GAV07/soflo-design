
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
        .attr("class", "chart")
        .attr("id", column)

    let width = document.querySelector(".chart").clientWidth
    let height = document.querySelector(".chart").clientHeight

    const xScale = d3.scaleBand()
        .domain(d3.range(columnCount.length))
        .range([0, width - padding])
        .padding(0.3)
    
    const yScale = d3.scaleLinear()
        .domain([0, greatest[1]])
        .range([height - padding, 0])
    

    const $svg = $div.append("svg")
        .attr("width", width)
        .attr("height", height)

    $svg.selectAll(".bar")
        .data(columnCount)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", ([, d], i) => xScale(i))
        .attr("width", xScale.bandwidth())
        .attr("y", ([, d]) => yScale(d))
        .attr("height", ([, d]) => yScale(d))

    
}


export default { barChart } 