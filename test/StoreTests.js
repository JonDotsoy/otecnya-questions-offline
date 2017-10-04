const util = require('util')
const {configureStore} = require('../src/store')
const {isLogin} = require('../src/util/sessionControl')

describe('store', () => {

  let store

  beforeEach(() => {
    store = configureStore()
  })

  it('Create a session', async () => {

    store.dispatch({
      type: 'sessin_login',
      rut: '111111111',
      name: 'John',
      location: 'atacama',
      business: 'achs',
      idCourse: '12345',
    })

    const state = store.getState()

    console.log( isLogin(state) )

  })

})

