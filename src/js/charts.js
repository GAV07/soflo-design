
//Semi-global variables
let width = null
let height = null
let greatest = null
let keys = null
let $div = null
let columnData = null
const chartTitles = [
    {id: "gender", title: "Gender spectrum of designers"},
    {id: "ethnicity", title: "Ethnicity of designers"},
    {id: "age", title: "Age range of designers"},
    {id: "entry_point", title: "How did designers enter into design?"},
    {id: "daily_work", title: "What do designers normally do?"},
    {id: "confident_skill", title: "What are our designers most comfortable with?"},
    {id: "dream_role", title: "What are our designer's dream role"},
]

function chartBase(element, data, column) {

    const columnAccessor = d => d[`${column}`]
    columnData = d3.rollup(data, d => d.length, columnAccessor)
    greatest = d3.greatest(columnData, ([, d]) => d)
    keys = [...columnData.keys()]
    //console.log(keys)
    console.log(columnData)

    $div = element.select(".section__charts")
        .append("div")
        .attr("class", "outer-frame")
        .attr("id", column)
        .append("div")
        .attr("class", "inner-frame")

    width = d3.select(".inner-frame").node().offsetWidth
    height = d3.select(".inner-frame").node().offsetHeight

}

function vBarChart(element, data, column) {

    //data processing
    chartBase(element,data,column)

    const xScale = d3.scaleBand()
        .domain(keys)
        .range([0, width])
        .padding(0.3)
    
    const yScale = d3.scaleLinear()
        .domain([0, greatest[1]])
        .range([height, 0])

    let columnName = chartTitles.find(d => d.id == column)

    $div.append("p")
        .text(columnName.title)
        .attr("class", "chart-title")
    
    const $svg = $div.append("svg")
        .attr("width", width)
        .attr("height", height)

    $svg.selectAll(".bar")
        .data(columnData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", ([k, d]) => xScale(k))
        .attr("width", xScale.bandwidth())
        .attr("y", ([, d]) =>  yScale(d))
        .attr("height", ([, d]) => yScale(0) - yScale(d))

    const xAxis = g => g.attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(0))
    
    $svg.append("g")
        .call(xAxis)
}



function hBarChart(element, data, column) {

    //data processing
    chartBase(element,data,column)

    const yScale = d3.scaleBand()
        .domain(keys)
        .range([height,0])
        .padding(0.3)
    
    const xScale = d3.scaleLinear()
        .domain([0, greatest[1]])
        .range([0,width])

    let columnName = chartTitles.find(d => d.id == column)

    $div.append("p")
        .text(columnName.title)
        .attr("class", "chart-title")
    
    const $svg = $div.append("svg")
        .attr("width", width)
        .attr("height", height)

    $svg.selectAll(".bar")
        .data(columnData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", ([k, d]) => yScale(k))
        .attr("height", yScale.bandwidth())
        .attr("x", ([, d]) =>  xScale(0))
        .attr("width", ([, d]) => xScale(d))

    const xAxis = g => g.attr("transform", `translate(0, 0)`)
        .call(d3.axisLeft(yScale).tickSize(0))
    
    $svg.append("g")
        .call(xAxis)
}

export default { vBarChart, hBarChart } 