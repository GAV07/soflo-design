/* global d3 */
import chartBuilder from "./charts"

const d3j = require('d3-jetpack/build/d3v4+jetpack');
let dataCleaned = null
let mapData = null
const $section = d3.selectAll(".section")
const $intro = d3.select(".intro")

function resize() {

}

function cleanData(data) {

  //Map Data
  data.map(d => {
    let miami = ["Downtown miami", "miami", "Miami-Dade"]
    for (let i=0; i < miami.length; i++) {
      d["What city in South Florida do you live in?"] = d["What city in South Florida do you live in?"].includes(miami[i]) ? "Miami" : d["What city in South Florida do you live in?"]
    }
    //console.log(d["What city in South Florida do you live in?"])
  })

  //Ethnicity Question processing
  data.map(d => {
    d["Please specify your ethnicity?"] = d["Please specify your ethnicity?"].includes(", ") ? "Multi-ethnic" : d["Please specify your ethnicity?"]
    d["Please specify your ethnicity?"] = d["Please specify your ethnicity?"].length == 0 ? "Did not Answer"  : d["Please specify your ethnicity?"]
  })

  //Enter into Design Question processing
  data.map(d => {
    //regex expression for capturing values between parentheses
    const regExpPar = "/\(([^)]+)\)/"
    d["How did you enter into design?"] = d["How did you enter into design?"].replace(regExpPar, "")
    d["How did you enter into design?"] = d["How did you enter into design?"].includes("Other Design Role") ? "Other Design Role" : d["How did you enter into design?"]
    d["How did you enter into design?"] = d["How did you enter into design?"].replace("Bootcamp, Career Switch", "Bootcamp")
    d["How did you enter into design?"] = d["How did you enter into design?"].length === 0 ? "Did not Answer" : d["How did you enter into design?"]
  })

  //Comfortable Question processing 
  data.map(d => {
    d["What area of design do you feel most confident in?"] = d["What area of design do you feel most confident in?"].length === 0 ? "Did not Answer" : d["What area of design do you feel most confident in?"]
  })
  return data.map(d => ({
    //...d,
    journey: d["Where are you in your design journey?"],
    city: d["What city in South Florida do you live in?"],
    gender: d["What are your preferred pronouns?"],
    ethnicity: d["Please specify your ethnicity?"],
    age: d["What is your age?"], //Q5
    entry_point: d["How did you enter into design?"],
    daily_work: d["What do you mainly do in your day to day work as a designer?"],
    confident_skill: d["What area of design do you feel most confident in?"],
    dream_role: d["What is your dream role?"],
    team_size: d["How big is your design team?"], //10
    groups: d["What groups are you apart of or interact with already in South Florida?"],
    fustrations: d["What part about being a designer has been most frustrating for you in your career?"],
    skill_up: d["What skills are you looking to improve in the next 6 months?"],
    lack_resources: d["If anything, what do you feel is missing from our design community that would make it more helpful and accessible to everyone?"],
    community_rating: d["Do you feel like our design community is on par with other major cities?"], //Q15
    emails: d["If you would like to see the results of our survey enter your email below."],
    token: d.Token
  }))
}

function setupIntro() {
  const $selTotal = d3.select(this).select("#designer_total")
  const $selMap = d3.select(this).select(".intro__map__inner")

  //total designers in survey
  $selTotal.text(`${dataCleaned.length} Designers have shared`)

  //creat intro map
  chartBuilder.chlorMap($selMap, dataCleaned, mapData)
}


function setupSection() {
  const $sel = d3.select(this)
  const id = $sel.attr('id')

  //separate chart isntances into sections
  if (id == "Demographics") {
    chartBuilder.vBarChart($sel, dataCleaned, "gender")
    chartBuilder.vBarChart($sel, dataCleaned, "ethnicity")
    chartBuilder.vBarChart($sel, dataCleaned, "age")
  } else if (id == "Career") {
    chartBuilder.hBarChart($sel, dataCleaned, "entry_point")
    chartBuilder.hBarChart($sel, dataCleaned, "daily_work")
    chartBuilder.hBarChart($sel, dataCleaned, "confident_skill")
    chartBuilder.hBarChart($sel, dataCleaned, "dream_role")
  } else if (id == "Descriptions") {

  } else {}
  
}

function setup(err, response) {
  dataCleaned = cleanData(response[0])
  mapData = response[1]
  
  $intro.each(setupIntro)
  $section.each(setupSection)
}

function init() {
  const survey = "./assets/data/survey-data.csv"
  const baseMap = "./assets/data/florida_cities.json"
  d3j.loadData(survey, baseMap, setup)
}

export default { init, resize };
