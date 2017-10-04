const {default: thunk} = require('redux-thunk')
const {createStore, combineReducers, applyMiddleware, compose} = require('redux')
const reducers = require('./reducer')

const configureStore = () => createStore(
  combineReducers({...reducers}),
  applyMiddleware(thunk)
)

module.exports.configureStore = configureStore
module.exports.store = configureStore()
