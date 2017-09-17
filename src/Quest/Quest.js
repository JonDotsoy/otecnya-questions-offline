const {connect} = require('react-redux')
const {Redirect} = require('react-router-dom')
const React = require('react')
const {default: styled} = require('styled-components')

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #F0F0F0;

  @media (max-width: 800px) {
    width: 100%;
    background-color: #FFFFFF;
  }

  @media (min-width: 841px) {
    padding: 20px 0px;
  }
`

const ContainerBody = styled.div`
  width: 800px;
  
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;

  @media (min-width: 841px) {
    margin: auto;
    box-shadow:
      0px 0px 6px 0px rgba(0, 0, 0, 0.24),
      0px 4px 6px 0px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 840px) {
    background-color: #FFFFFF;
    width: 100%;
  }
`

const HeaderContent = styled.div`
  display: block;
`

const IDRUTLabelHeader = styled.div `
`

const BodyQuestion = styled.div `
  
`

const TitleQuestion = styled.h1 `
  font-size: 20px;
`

const BodyResponses = styled.div `
  padding: 10px 0px;
`

const BTNResponse = styled.button `
  display: block;
  width: 100%;
  border: none;
  text-align: left;
  padding: 10px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`

const Quest = ({rut, rut_format, question, currentQuestion, countQuestions, nextQuestion}) => (
  !rut ? <Redirect to='/session' />
  : <Container>
    <ContainerBody>
      <HeaderContent>
        RUT {rut_format} — {currentQuestion + 1} de {countQuestions} preguntas.
      </HeaderContent>
      <BodyQuestion>
        <TitleQuestion>{question.title}</TitleQuestion>
        <BodyResponses>
          {question.options.map((option, index) => (
            <BTNResponse key={`${question.title}-${option}`} onClick={nextQuestion} data-nrequest={index} data-value={option}>{option}</BTNResponse>
          ))}
        </BodyResponses>
      </BodyQuestion>
    </ContainerBody>
  </Container>
)

module.exports.Quest = connect(
  (props) => ({
    rut: props.session.id,
    rut_format: props.session.id_format,
    question: props.quest.questions[props.quest.currentQuestion],
    currentQuestion: props.quest.currentQuestion,
    countQuestions: props.quest.questions.length,
  }),
  (dispatch, props) => ({
    nextQuestion: ({target: {dataset: {value, nrequest}}}) => {
      dispatch({type: 'response_question', response: value, index_question: nrequest})
    }
  })
)(Quest)
