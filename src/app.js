console.info(`${process.env.npm_package_name} v${process.env.npm_package_version}`)

require('./registerServiceWorker')

const React = require('react')
const ReactDOM = require('react-dom')
const {injectGlobal} = require('styled-components')
const {createStore, combineReducers, applyMiddleware} = require('redux')
const reducers = require('./reducer')
const {Provider} = require('react-redux')
const {HashRouter: Router, Route, Switch} = require('react-router-dom')
const {Quest} = require('./Quest/Quest')
const {Session} = require('./Session/Session')
const {default: thunk} = require('redux-thunk')
const {formatQuestion, sampleQuestions} = require('./util/samples')
const questions = require('./questions')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html {
    padding: 10px 20px;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  body {
    padding: 0px;
    margin: 0px;
  }
`

const store = createStore(
  combineReducers({...reducers}),
  {
    quest: {
      currentQuestion: 0,
      questions: sampleQuestions(questions),
      responses: [],
    },
    session: {
      id: '111111111',
      id_format: '11.111.111-1',
    },
  },
  applyMiddleware(thunk),
)

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Quest} />
          <Route exact path='/session' component={Session} />
        </Switch>
      </Router>
    </Provider>
  </div>
  ),
  document.querySelector('#app')
)
