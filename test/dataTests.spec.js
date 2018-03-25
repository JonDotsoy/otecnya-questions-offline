/* global describe, it */

const util = require('util')
const {expect} = require('chai')
const {configs, resourceLink} = require('../src/libs/data/connector')
const {responses} = require('../src/libs/data/synchronization')

const log = console.log

describe('Data Test', () => {
  describe('Connector', () => {
    it('check link', () => {
      expect(configs.link).to.be.equal('https://jon.soy/services/question/api/')
    })

    it('check resource to load', () => {
      expect(
        resourceLink('responses', {find: {a: 3}})
      ).to.be.equal(
        'https://jon.soy/services/question/api/responses?find=%7B%22a%22%3A3%7D'
      )
    })
  })

  describe('Synchronization', () => {
    describe('Responses', () => {

      // it('pull resources', async () => {

      //   console.log(
      //     await responses.get()
      //   )

      //   expect(await responses.get()).to.be.a("Array")

      // })

      // it('put resource', async () => {

      //   console.log(
      //     await responses.put({
      //       rut: '1111111',
      //       responses: [
      //         'a', 'b'
      //       ]
      //     })
      //   )

      // })

    })
  })
})
