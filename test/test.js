
const {expect} = require('chai')

const questions = require('../src/questions')

const {formatQuestion, sampleQuestions} = require('../src/util/samples')

describe('Load questions', () => {
  it('formatQuestion', () => {
    const q = questions[3]
    const qp = formatQuestion(q)

    for (const indexOP in q.options) {
      const op = q.options[indexOP]

      expect(qp.options).include(op)
    }

    expect(q.title).is.equal(qp.title)
    expect(q.options).include(qp.optionCorrect)
  })

  it('get questions', () => {
    const samples = sampleQuestions(questions)

    expect(sampleQuestions(questions).length).is.equal(10)

    const ids = []

    samples.map(n => {
      expect(ids.find(d => d === n.title)).to.equal(undefined)
      ids.push(n.title)
    })
  })
})
