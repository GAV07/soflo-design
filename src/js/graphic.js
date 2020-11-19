/* global d3 */
import chartBuilder from "./charts"

const d3j = require('d3-jetpack/build/d3v4+jetpack');
let dataCleaned = null
const $section = d3.selectAll(".section")

function resize() {

}

function cleanData(data) {

  //Ethnicity Question processing
  data.map(d => {
    d["Please specify your ethnicity?"] = d["Please specify your ethnicity?"].includes(", ") ? "Multi-ethnic" : d["Please specify your ethnicity?"]
    d["Please specify your ethnicity?"] = d["Please specify your ethnicity?"].length == 0 ? "Other"  : d["Please specify your ethnicity?"]
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


function setupSection() {
  const $sel = d3.select(this)
  const id = $sel.attr('id')

  //separate chart isntances into sections
  if (id == "Demographics") {
    chartBuilder.barChart($sel, dataCleaned, "gender")
    chartBuilder.barChart($sel, dataCleaned, "ethnicity")
    chartBuilder.barChart($sel, dataCleaned, "age")
  } else if (id == "Career") {
    chartBuilder.barChart($sel, dataCleaned, "entry_point")
    chartBuilder.barChart($sel, dataCleaned, "daily_work")
    chartBuilder.barChart($sel, dataCleaned, "confident_skill")
    chartBuilder.barChart($sel, dataCleaned, "dream_role")
  } else if (id == "Descriptions") {

  } else {}
  
}

function setup(err, response) {
  dataCleaned = cleanData(response[0])
  $section.each(setupSection)
}

function init() {
  const file = "./assets/data/survey-data.csv"
  d3j.loadData(file, setup)
}

export default { init, resize };
