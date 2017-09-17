
const RUT = require('rut.js')
const initialStateQuest = {
  currentQuestion: 0,
  questions: [],
  responses: [],
}
module.exports.quest = function (state = initialStateQuest, action) {
  switch (action.type) {
    case 'response_question': {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        responses: [
          ...state.responses,
          {
            question: state.questions[state.currentQuestion],
            response: action.response,
          }
        ]
      }
    }
    default: return state
  }
}

const initialStateSession = {
  id: undefined,
  id_format: undefined,
  tmp_rut: undefined,
  tmp_rut_valid: false,
}

module.exports.session = function (state = initialStateSession, action) {
  switch (action.type) {
    case 'memory_rut': {
      return {
        ...state,
        tmp_rut: action.tmp_rut,
        tmp_rut_valid: RUT.validate(RUT.clean(action.tmp_rut)),
      }
    }
    case 'sessin_login': {
      return {
        ...state,
        id: RUT.clean(action.rut),
        id_format: RUT.format(RUT.clean(action.rut)),
      }
    }
    default: return state
  }
}
