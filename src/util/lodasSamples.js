
const {formatQuestion, sampleQuestions} = require('./samples')
const questions = require('../questions')

module.exports.loadQuestions = (...a) => sampleQuestions(questions, ...a)

