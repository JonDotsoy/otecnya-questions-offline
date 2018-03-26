
/* global location, afterEach, beforeEach, indexedDB, localStorage, after, before, describe, it */

const config = require('../config')
const puppeteer = require('puppeteer')
const ms = require('ms')
const path = require('path')
const {expect} = require('chai')
const express = require('express')
const sample = require('lodash/sample')

let browser = puppeteer.launch({headless: true})
let _page = browser.then((browser) => browser.newPage())

describe('Function test', async function () {
  this.timeout(ms('2m'))

  beforeEach(async () => {
    const page = await _page

    await page.goto(`http://localhost:3000/${config.START_PATH}/`)
  })

  afterEach(async () => {
    const page = await _page
    const b = await browser

    _page = await b.newPage()

    await page.evaluate(() => localStorage.clear())
    await page.evaluate(() => indexedDB.deleteDatabase('responses'))

    await page.close()
  })

  it('Complete quest', async function () {
    const page = await _page

    await loginStep(page)
    await goToQuestFromSessionLogged(page)
    await completeQuestStep(page)
  })

  it('Save registre', async function () {
    const page = await _page

    await createRegistreSteps(page)
    await createRegistreSteps(page)

    await goRegistresFromHome(page)

    const registers = await page.$$('[role="register"]')

    expect(registers).length(2)
  })

  it('back home from registres', async function () {
    const page = await _page

    await goRegistresFromHome(page)

    expect(await getHash(page)).to.be.eql('#/register')

    await page.click(`[href="#/session"]`)

    expect(await getHash(page)).to.be.eql('#/session')
  })

  it('close session', async function () {
    const page = await _page
    await loginStep(page)

    expect(await getHash(page)).to.be.eql('#/session')

    const btnCloseSession = (await page.$$('a'))[1]

    await btnCloseSession.click()

    expect(await getHash(page)).to.be.eql('#/session')
  })
})

async function getHash (page) {
  return page.evaluate(() => location.hash)
}

async function goRegistresFromHome (page) {
  const registrosBtn = (await page.$$('a'))[1]
  await registrosBtn.click()
  await page.waitFor(`[role="registers"]`)
}

async function waitForever () {
  console.log('wait')
  await new Promise(() => { })
}

async function createRegistreSteps (page) {
  await loginStep(page)
  await goToQuestFromSessionLogged(page)
  await completeQuestStep(page)
  // save registre
  await page.click('button')
  await page.waitFor('[href="#/"]')
  await page.click('[href="#/"]')
  const closeSessionBtn = (await page.$$('a'))[1]
  await closeSessionBtn.click()
}

async function completeQuestStep (page) {
  for (let i = 0; i < 10; i++) {
    const nrequests = await page.$$('[data-nrequest]')
    await sample(nrequests).click()
  }
}

async function loginStep (page) {
  await page.type(`[name="name"]`, 'Carlos')
  await page.type(`[name="rut"]`, '153168636')
  await page.type(`[name="idCourse"]`, '1')
  await page.type(`[name="location"]`, 'Antofagasta')
  await page.type(`[name="business"]`, 'MOVIC CONSTRUCCIÓN VIVIENDAS MODULARES')
  await page.click('form a')
}
async function goToQuestFromSessionLogged (page) {
  await page.click('[href="#/quest"]')
}
