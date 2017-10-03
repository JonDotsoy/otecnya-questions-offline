const {default: thunk} = require('redux-thunk')
const {createStore, combineReducers, applyMiddleware, compose} = require('redux')
const reducers = require('./reducer')

const store = createStore(
  combineReducers({...reducers}),
  applyMiddleware(thunk)
)

module.exports.store = store
