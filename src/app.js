/* global localStorage */

console.info(`${process.env.npm_package_name} v${process.env.npm_package_version} ${process.env.npm_package_gitHead && `(${process.env.npm_package_gitHead.slice(0, 7)})`}`)

const React = require('react')
const ReactDOM = require('react-dom')
const {injectGlobal} = require('styled-components')
const {store} = require('./store')
const {Provider} = require('react-redux')
const {HashRouter: Router, Route, Switch, Redirect} = require('react-router-dom')
const {Quest} = require('./Quest/Quest')
const {Session} = require('./Session/Session')
const {Result} = require('./Result/Result')
const {Logger} = require('./components/Logger/Logger')
const {Questions} = require('./Questions/Questions')
const {Register} = require('./Register/Register')
const {RegisterDetaills} = require('./Register/RegisterDetaills')
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

// Load service worker
require('./registerServiceWorker')({
  store,
})
  .catch(console.error)

if (/^(true|1)$/i.test(localStorage.autologin)) {
  store.dispatch({
    type: localStorage.autologin_type || 'sessin_login',
    rut: localStorage.autologin_rut || '111111111',
    name: localStorage.autologin_name || 'John',
    location: localStorage.autologin_location || 'atacama',
    business: localStorage.autologin_business || 'achs',
    idCourse: localStorage.autologin_idCourse || '12345',
  })
}

const app = <div>
  <Provider store={store}>
    <div>
      <Logger />
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/session' />} />
          <Route exact path='/quest' component={Quest} />
          <Route exact path='/questions' component={Questions} />
          <Route exact path='/session' component={Session} />
          <Route exact path='/results' component={Result} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/:idRegistre' component={RegisterDetaills} />
        </Switch>
      </Router>
    </div>
  </Provider>
</div>

ReactDOM.render(app, document.querySelector('#app'))
