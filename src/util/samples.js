
const sample = require('lodash/sample')

module.exports.formatQuestion = formatQuestion
module.exports.sampleQuestions = sampleQuestions

function formatQuestion ({stag, options, title}) {
  const optionCorrect = options[0]

  return {
    stag,
    title,
    optionCorrect,
    options: [...options].sort(() => sample([-1, 1])).sort(() => sample([-1, 1])),
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
