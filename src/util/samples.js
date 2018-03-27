
const random = require('lodash/random')
const sample = require('lodash/sample')

module.exports.formatQuestion = formatQuestion
module.exports.sampleQuestions = sampleQuestions

function formatQuestion ({stag, options, title, sort}) {
  const optionCorrect = options[0]

  let optionsOut = [...options].sort(() => sample([-1, 1]))

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
  return questions.concat().sort(() => sample([-1, 1])).slice(0, len).map(formatQuestion)
}
