console.info(`${process.env.npm_package_name} v${process.env.npm_package_version}`)

require('./registerServiceWorker')

const sample = require('lodash/sample')
const React = require('react')
const ReactDOM = require('react-dom')
const {injectGlobal} = require('styled-components')
const {createStore, combineReducers, applyMiddleware, compose} = require('redux')
const reducers = require('./reducer')
const {Provider} = require('react-redux')
const {HashRouter: Router, Route, Switch} = require('react-router-dom')
const {Quest} = require('./Quest/Quest')
const {Session} = require('./Session/Session')
const {Result} = require('./Result/Result')
const {Register} = require('./Register/Register')
const {RegisterDetaills} = require('./Register/RegisterDetaills')
const {default: thunk} = require('redux-thunk')
const {loadQuestions} = require('./util/lodasSamples')
const questions = require('./questions')
const {default: persistState} = require('redux-localstorage')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  body {
    padding: 0px;
    margin: 0px;
  }
`

const _sampleQuestions = loadQuestions()

let n = 0

const store = createStore(
  combineReducers({...reducers}),
  true ? undefined : {
    quest: {
      currentQuestion: 0,
      finishQuestionary: true,
      questions: _sampleQuestions,
      responses: [],
      responses: [
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          // response: _sampleQuestions[n].optionCorrect,
          response: `_sampleQuestions[n].optionCorrect`
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        },
        {
          question: _sampleQuestions[++n],
          response: _sampleQuestions[n].optionCorrect
        }
      ]
    },
    session: {
      id: '111111111',
      id_format: '11.111.111-1'
    }
  },
  applyMiddleware(thunk)
)

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Quest} />
          <Route exact path='/session' component={Session} />
          <Route exact path='/results' component={Result} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/:idRegistre' component={RegisterDetaills} />
        </Switch>
      </Router>
    </Provider>
  </div>
  ),
  document.querySelector('#app')
)
