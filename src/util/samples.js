
const sample = require('lodash/sample')

module.exports.formatQuestion = formatQuestion
module.exports.sampleQuestions = sampleQuestions

function formatQuestion ({stag, options, title, sort}) {
  const optionCorrect = options[0]

  let optionsOut = [...options].sort(() => sample([-1, 1])).sort(() => sample([-1, 1]))

  if (sort) {
    optionsOut.sort(sort)
  }

  return {
    stag,
    title,
    optionCorrect,
    options: optionsOut,
  }
}

function sampleQuestions (questions, len = 10) {
  const outsamples = []

  while (outsamples.length < 10) {
    const proposalSample = formatQuestion(sample(questions))

    const o = outsamples.find(e => e.title === proposalSample.title)

    if (o === undefined) {
      outsamples.push(proposalSample)
    }
  }

  return outsamples
}
