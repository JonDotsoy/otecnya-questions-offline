/* global describe, it */

const util = require('util')
const {expect} = require('chai')
const questions = require('../src/questions')
const {formatQuestion, sampleQuestions} = require('../src/util/samples')

describe('Load questions', () => {
  // Util format question
  describe('formatQuestion', () => {
    const utilGetTestQuestion = (indexQuestion) => {
      const questionBrute = questions[indexQuestion]
      const question = formatQuestion(questionBrute)

      for (const indexOption in questionBrute.options) {
        const option = questionBrute.options[indexOption]

        expect(question.options).include(option)
      }

      expect(questionBrute.title).is.equal(question.title)

      expect(questionBrute.options).include(question.optionCorrect)

      return {questionBrute, question}
    }

    // Test default questions
    it('default question', () => {
      const {questionBrute, question} = utilGetTestQuestion(3)
    })

    it('question with asc', () => {
      const {questionBrute, question} = utilGetTestQuestion(13)

      expect(question.options).to.be.eql([ '10 kilos.', '15 kilos.', '20 kilos.', '25 kilos.' ])
    })

    it('question with allways end', () => {
      const {questionBrute, question} = utilGetTestQuestion(21)

      expect(question.options[question.options.length - 1]).to.be.equal(question.optionCorrect)
    })
  })

  // Obtiene una pregunta de forma aleatoria y compara la respuesta correcta
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
