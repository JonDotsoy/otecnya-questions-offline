const React = require('react')
const util = require('util')
const {formatQuestion} = require('../util/samples')
const questions = require('../questions')
const {Question} = require('../Quest/Quest')
const {connect} = require('react-redux')
const {default: styled} = require('styled-components')

const Container = styled.div `
  background-color: white;
  width: 100%;
  height: 100vh;
  max-width: 800px;
  margin: auto;
  position: relative;
`

const QuestionContainer = styled.div `
  padding: 20px;
  padding-top: 80px;
`

const GoodOption = styled.span`
  dsiplay: block;
  font-size: 15px;
  color: green;
  &::before {
    content: '* '
  }
`

const PanelControl = styled.div `
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 20px;
  background-color: white;
  box-shadow:
    0px 0px 4px rgba(0, 0, 0, .24),
    0px 4px 4px rgba(0, 0, 0, .12)
  ;
`

class Questions extends React.Component {
  componentWillMount() {
    this.props.pullQuestions()
  }

  render () {
    const {goToHome, state, questions, pullQuestions, checkShowCorrectResponse, showCorrect} = this.props

    if (state === 'loading') {
      return <div>Cargando...</div>
    }

    return <Container>
      <PanelControl>
        <button onClick={goToHome}>Volver al Inicio</button>
        <button onClick={pullQuestions}>Reload</button>
        <span>
          <input type="checkbox" onClick={checkShowCorrectResponse}/>
          <span>Ver respuesta correcta</span>
        </span>
      </PanelControl>
      {
        questions.map((question, indexQuestion) => (
          <QuestionContainer key={indexQuestion}>
            <Question key={indexQuestion} title={question.title} options={question.options}></Question>
            {showCorrect &&
              <GoodOption>{question.optionCorrect}</GoodOption>
            }
            {/*<pre>{util.inspect(question, { showHidden: true, depth: null, colors: false })}</pre>*/}
          </QuestionContainer>
        ))
      }
    </Container>
  }
}

module.exports.Questions = connect(
  (state, props) => ({
    state: state.questions.state,
    questions: state.questions.questions,
    showCorrect: state.questions.showCorrect,
  }),
  (dispatch, props) => ({
    pullQuestions: () => {
      dispatch({type: 'PULL_QUESTIONS'})
      dispatch(async (dispatch, getState) => {
        dispatch({
          type: 'SET_QUESTIONS',
          questions: questions.map(formatQuestion)
        })
      })
    },
    checkShowCorrectResponse: (event) => {
      if (event.target.checked) {
        dispatch({type:'SHOW_CORRECT_OPTION'})
      } else {
        dispatch({type:'HIDE_CORRECT_OPTION'})
      }
    },
    goToHome: (event) => {
      props.history.replace('/')
    },
  })
)(Questions)
